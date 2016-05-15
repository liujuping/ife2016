/**
 * Created by wangtingdong on 16/4/27.
 */

var game = new Game();

function init() {
    game.init();
}

//图片仓库，方便调用图片
var imageRepository = new function() {
    this.background = new Image();
    this.people=new Image();
    this.obstacle=new Image();
    this.target=new Image();
    this.bullet=new Image();
    this.enemy=new Image();
    this.explode=new Image();
    var numImages = 7;
    var numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }

    this.background.onload=function(){
        imageLoaded();
    };
    this.people.onload=function(){
        imageLoaded();
    };
    this.obstacle.onload=function(){
        imageLoaded();
    };
    this.target.onload=function(){
        imageLoaded();
    };
    this.bullet.onload=function (){
        imageLoaded();
    };
    this.enemy.onload=function(){
        imageLoaded();
    };
    this.explode.onload=function(){
        imageLoaded();
    };

    this.background.src = "img/bg.png";
    this.people.src='img/people.png';
    this.obstacle.src='img/obstacle.png';
    this.target.src='img/target.png';
    this.bullet.src='img/bullet.png';
    this.enemy.src='img/enemy.png';
    this.explode.src='img/explode.png';
};

var musicRepository=new  function(){
    this.gameInMusic=new  Audio('music/gameInMusic.mp3');
    this.explodeMusic= new Audio('music/explore.wav');
    this.suceessMusic=new Audio('music/success.mp3');
    this.failMusic=new Audio('music/fail.mp3');

    this.gameInMusic.volume=0.3;
    this.explodeMusic.volume=0.1;
    this.suceessMusic.volume=0.1;
    this.failMusic.volume=0.3;

    this.gameInMusic.load();
    this.explodeMusic.load();
    this.suceessMusic.load();
    this.failMusic.load();
};

function checkReadyState() {
    if (1
        //musicRepository.gameInMusic.readyState === 4 &&
        //musicRepository.explodeMusic.readyState === 4 &&
        //musicRepository.suceessMusic.readyState===4 &&
        //musicRepository.failMusic.readyState===4
        ) {
        clearInterval(game.checkAudio);
        game_wait_page.style.display = "none";
        game_enter_page.style.display='block';
    }
}


function Bullet(object){
    this.alive = false;
    this.self = object;
    this.isColliding=false;
    this.isObstacle=false;
    this.spawn = function(x, y, speed,rotation) {
        this.x = x-this.width/2;
        this.y = y-this.height/2;
        this.speed_x = speed*Math.cos(rotation*Math.PI/180);
        this.speed_y= speed*Math.sin(rotation*Math.PI/180);
        this.alive = true;
    };

    this.draw = function() {
        this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
        this.y += this.speed_y;
        this.x+=this.speed_x;
        if(isObstacle(this.x,this.y,this.width,this.height)) {
            return true;
        }
        if(this.x<0 || this.x>this.canvasWidth || this.y<0 || this.y>this.canvasHeight) {
            return true;
        }
        if(this.isColliding) {
            return true;
        }

        this.context.drawImage(imageRepository.bullet, this.x, this.y);
    };

    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
        this.isColliding = false;
    };
}
Bullet.prototype=new Drawable();

//对象池
function Pool(maxSize) {
    var size = maxSize;
    var pool = [];

    this.getPool = function() {
        var obj = [];
        for (var i = 0; i < size; i++) {
            if (pool[i].alive) {
                obj.push(pool[i]);
            }
        }
        return obj;
    };

    this.init = function(object) {
        var i= 0,bullet;
        if (object == "bullet") {
            for (i = 0; i < size; i++) {
                bullet = new Bullet("bullet");
                bullet.type='peopleBullet';
                bullet.init(0,0, imageRepository.bullet.width, imageRepository.bullet.height);
                pool[i] = bullet;
            }
        }
        else if(object=='enemy') {
            for(i=0;i<size;i++) {
                var enemy=new Enemy();
                enemy.init(0,0,30,30);
                pool[i]=enemy;
            }
        }
        else if(object=='enemyBullet') {
            for (i = 0; i < size; i++) {
                bullet = new Bullet("bullet");
                bullet.type='enemyBullet';
                bullet.init(0,0, imageRepository.bullet.width, imageRepository.bullet.height);
                pool[i] = bullet;
            }
        }
    };

    //发射子弹
    this.get = function(x, y, speed,rotation) {
        if(!pool[size - 1].alive) {
            pool[size - 1].spawn(x, y, speed,rotation);
            pool.unshift(pool.pop());
        }
    };
    //放置敌人
    this.putEnemy = function(num) {
        var cell_y=parseInt(MAP.cols/(num+1)), y= 0, x=0;
        for (var i = 0; i < num; i++) {
            y+=cell_y;
            x=0;
            while(MAP.arr[x][y]!==2) {
                x++;
            }

            if(!pool[size - 1].alive) {
                pool[size - 1].put(x*MAP.cell_width, y*MAP.cell_height);
                pool.unshift(pool.pop());
            }
        }
    };

    this.animate = function() {
        for (var i = 0; i < size; i++) {
            if (pool[i].alive) {
                if (pool[i].draw()) {
                    pool[i].clear();
                    pool.push((pool.splice(i,1))[0]);
                }
            }
            else
                break;
        }
    };

    this.clear=function(){
        for(var i=0;i<size;i++) {
            pool[i].clear();
        }
    }
}

//抽象类，需要在地图中画的对象
function Drawable() {
    this.init = function(x, y,width,height) {
        this.x = x;
        this.y = y;
        this.width=width;
        this.height=height;
    };

    this.speed = 0;
    this.canvasWidth = CANVAS_WIDTH;
    this.canvasHeight = CANVAS_HEIGHT;

    this.draw = function() {
    };
    this.isCollidableWith = function(object) {
        return (this.collidableWith === object.type);
    };
}

//背景，障碍物和空地的绘制
function Background() {
    //根据地图的数组画出空地和障碍物
    this.draw = function() {
        for(var i=0;i<MAP.rows;i++) {
            for(var j=0;j<MAP.cols;j++) {
                if(MAP.arr[i][j]==1) {
                    this.context.drawImage(imageRepository.obstacle,this.x+i*this.width, this.y+j*this.height,this.width,this.height);
                }
                else {
                    this.context.drawImage(imageRepository.background, this.x+i*this.width, this.y+j*this.height,this.width,this.height);
                }
            }
        }

    };
}
Background.prototype = new Drawable();

//移动的对象
function People(){
    this.rotation=0;        //旋转的角度
    this.bulletPool=new Pool(20);
    this.speed=2;
    this.speedX=2;           //速度
    this.speedY=0;
    this.isRoute=false;     //是否是按路线移动
    this.routeMoveArr=[];   //存储路线的数组
    this.isColliding=false;
    this.isObstacle=false;
    this.type='people';
    this.collidableWith='enemyBullet';

    this.init = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.isColliding = false;
        this.bulletPool.init("bullet");
    };

    this.explode=function(num,x,y,width,height) {
        num = num ? num : 0;
        x = x ? x : this.x;
        y = y ? y : this.y;
        width=width?width:this.width;
        height=height?height:this.height;
        if(num==3) {
            this.context.clearRect(x,y,width,height);
            return;
        }
        this.context.drawImage(
            imageRepository.explode,
            width*num,
            0,
            width,
            height,
            x,
            y,
            width,
            height);
        setTimeout(this.explode.bind(this,++num, x, y,width,height), 100);
        return true;
    };

    this.draw=function(){
        var angleInRadians=this.rotation*Math.PI/180;
        this.context.save();
        this.context.translate(this.x+this.width/2,this.y+this.height/2);
        this.context.rotate(angleInRadians);
        this.context.drawImage(imageRepository.people,-this.width/2,-this.height/2,this.width,this.height);
        this.context.restore();
    };

    this.move = function() {
        if (this.isRoute) {
            this.routeChange();
        }
        if(this.isColliding) {
            game.gameOver();
            return this.explode();
        }
        if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
            var angleInRadians=this.rotation*Math.PI/180;
            this.context.save();
            this.context.translate(this.x+this.width/2,this.y+this.height/2);
            this.context.rotate(angleInRadians);
            this.context.clearRect(-this.width/2,-this.height/2,this.width,this.height);
            this.context.restore();

            if (KEY_STATUS.left) {
                this.speedX=-this.speed;
                this.rotation = 180;
            } else if (KEY_STATUS.right) {
                this.speedX=this.speed;
                this.rotation=0;
            } else {
                this.speedX=0;
            }
            if (KEY_STATUS.up) {
                this.speedY=-this.speed;
                this.rotation=270;
            } else if (KEY_STATUS.down) {
                this.speedY=this.speed;
                this.rotation=90;
            } else {
                this.speedY=0;
            }

            if(KEY_STATUS.left && KEY_STATUS.up) {
                this.rotation=225;
            } else if(KEY_STATUS.left && KEY_STATUS.down) {
                this.rotation=135;
            } else if(KEY_STATUS.right && KEY_STATUS.up) {
                this.rotation=315;
            } else if(KEY_STATUS.right && KEY_STATUS.down) {
                this.rotation=45;
            }

            this.x+=this.speedX;
            this.y+=this.speedY;
            detectCollision();
            if(isObstacle(this.x,this.y,this.width,this.height)||this.isObstacle) {
                this.x-=this.speedX;
                this.y-=this.speedY;
                this.isObstacle=false;
            }
        }

        if(KEY_STATUS.space) {
            this.fire();
            KEY_STATUS.space=false;
        }
        this.draw();
    };
    this.fire=function(){
        this.bulletPool.get(this.x+this.width/2,this.y+this.height/2,this.speed*1.5,this.rotation);
    };
    this.routeChange=function() {
        //重新设置移动的方向
        KEY_STATUS['left'] = false;
        KEY_STATUS['right'] = false;
        KEY_STATUS['up'] = false;
        KEY_STATUS['down'] = false;

        if(this.routeMoveArr.length==0) {
            this.isRoute=false;
            return;
        }

        var currentRoute = this.routeMoveArr[0];

        if(this.x==currentRoute.x*MAP.cell_width && this.y==currentRoute.y*MAP.cell_height) {
            this.routeMoveArr.shift();
            if(this.routeMoveArr.length==0) {
                this.isRoute=false;
                return;
            }
            currentRoute = this.routeMoveArr[0];
        }

        if (this.x > currentRoute.x*MAP.cell_width) {
            KEY_STATUS['left'] = true;
        }
        else if (this.x < currentRoute.x*MAP.cell_width) {
            KEY_STATUS['right'] = true;
        }
        else {
            KEY_STATUS['left'] = false;
            KEY_STATUS['right'] = false;
        }
        if (this.y > currentRoute.y*MAP.cell_height) {
            KEY_STATUS['up'] = true;
        }
        else if (this.y < currentRoute.y*MAP.cell_width) {
            KEY_STATUS['down'] = true;
        }
        else {
            KEY_STATUS['down'] = false;
            KEY_STATUS['up'] = false;
        }
    }
}
People.prototype=new Drawable();

//要到达的目标
function Target(){
    this.isColliding=false;
    this.collidableWith='people';
    this.type='target';
    this.draw=function(){
        this.context.drawImage(imageRepository.target,this.x,this.y,this.width,this.height);
    };
    this.clear=function(){
        this.isColliding=false;
    };
}
Target.prototype=new Drawable();

//敌人
function Enemy(){
    this.isColliding=false;
    this.type='enemy';
    this.isObstacle=false;
    this.collidableWith='peopleBullet';
    this.speed=1;
    this.speedX=1;
    this.speedY=0;
    this.alive=false;
    this.rotation=0;
    this.fireNum=0;
    this.init=function(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alive = false;
        this.isColliding = false;
    };
    this.put=function(x,y){
        this.x=x;
        this.y=y;
        this.alive=true;
    };
    this.draw=function(){
        var angleInRadians=this.rotation*Math.PI/180;
        this.context.save();
        this.context.translate(this.x+this.width/2,this.y+this.height/2);
        this.context.rotate(angleInRadians);
        this.context.clearRect(-this.width/2-1,-this.height/2-1,this.width+2,this.height+2);
        this.context.restore();
        this.move();
        if(this.isColliding) {
            musicRepository.explodeMusic.play();
            return this.explode();
        }
        angleInRadians=this.rotation*Math.PI/180;
        this.context.save();
        this.context.translate(this.x+this.width/2,this.y+this.height/2);
        this.context.rotate(angleInRadians);
        this.context.drawImage(imageRepository.enemy,-this.width/2,-this.height/2,this.width,this.height);
        this.context.restore();
    };
    this.move=function(){
        if(this.monitor()) {
            return;
        }
        if(this.isObstacle) {
            this.speedX*=-1;
            this.speedY*=-1;
            this.isObstacle=false;
            this.rotation>180?this.rotation-=180:this.rotation+=180;
        }
        this.x+=this.speedX;
        this.y+=this.speedY;
        if( isObstacle(this.x,this.y,this.width,this.height)) {
            this.changeDirect();
        }
    };
    this.changeDirect=function(){
        this.x-=this.speedX;
        this.y-=this.speedY;
        this.rotation=90*parseInt(Math.random()*4);
        switch (this.rotation) {
            case  0:
                this.speedX=this.speed;
                this.speedY=0;
                break;
            case  90:
                this.speedX=0;
                this.speedY=this.speed;
                break;
            case  180:
                this.speedX=-this.speed;
                this.speedY=0;
                break;
            case 270:
                this.speedY=-this.speed;
                this.speedX=0;
                break;
        }
    };
    this.monitor=function(){
        var x=game.people.x - this.x,
            y=game.people.y - this.y,
            hasObstacle=true;

        for(var i=0;i<3;i++) {
            //判断敌人与人之间是否有障碍
            if(isObstacle(this.x+x/3*i,this.y+y/3*i,this.width,this.height)) {
                hasObstacle= false;
            }
        }

        if(hasObstacle && Math.abs(x)<3*MAP.cell_width && Math.abs(y)<3*MAP.cell_height) {
            this.enter=true;


            this.rotation = parseInt(Math.atan2(y,x ) / Math.PI * 180);
            if(!this.fireNum) {
                this.fireNum=100;
                this.fire();
            }
            else {
                this.fireNum--;
            }
            return true;
        }
        else if(this.enter) {
            this.enter=false;
            this.changeDirect();
        }
        return false;
    };
    this.clear=function(){
        this.alive=false;
        this.isColliding=false;
        this.x=0;
        this.y=0;
    };
    this.fire=function(){
        game.enemyBulletPool.get(this.x+this.width/2,this.y+this.height/2,this.speed*1.5,this.rotation);
    };
    this.explode=function(num,x,y,width,height) {
        num = num ? num : 0;
        x = x ? x : this.x;
        y = y ? y : this.y;
        width=width?width:this.width;
        height=height?height:this.height;
        if(num==3) {
            this.context.clearRect(x,y,width,height);
            return;
        }
        this.context.drawImage(
            imageRepository.explode,
            width*num,
            0,
            width,
            height,
            x,
            y,
            width,
            height);
        setTimeout(this.explode.bind(this,++num, x, y,width,height), 100);
        return true;
    }
}

Enemy.prototype=new Drawable();

function Game() {
    this.init = function() {
        this.bgCanvas = document.getElementById('background');
        this.peopleCanvas=document.getElementById('people');

        this.bgCanvas.width=CANVAS_WIDTH;
        this.bgCanvas.height=CANVAS_HEIGHT;
        this.peopleCanvas.width=CANVAS_WIDTH;
        this.peopleCanvas.height=CANVAS_HEIGHT;

        this.map=randomMap(Map.arr,MAP.rows,MAP.cols);
        this.quadTree=new QuadTree(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.peopleContext=this.peopleCanvas.getContext('2d');

            Background.prototype.context = this.bgContext;
            People.prototype.context=this.peopleContext;
            Target.prototype.context=this.bgContext;
            Bullet.prototype.context=this.peopleContext;
            Enemy.prototype.context=this.peopleContext;

            this.background = new Background();
            this.background.init(0,0,MAP.cell_width,MAP.cell_height);

            this.people=new People();
            this.people.init(0,0,30,30);

            this.target=new Target();
            this.target.init((MAP.rows-2)*MAP.cell_width,(MAP.cols-2)*MAP.cell_height,30,30);

            //敌人的对象池
            this.enemyPool=new Pool(10);
            this.enemyPool.init('enemy');

            this.enemyBulletPool=new Pool(20);
            this.enemyBulletPool.init('enemyBullet');
            this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
            return true;
        } else {
            return false;
        }
    };

    this.start = function() {
        //随机地图
        MAP.arr=randomMap(MAP.arr,MAP.rows,MAP.cols);
        //放置敌人
        this.enemyPool.putEnemy(5);
        //画地图
        this.background.draw();
        this.people.draw();
        game.target.draw();
        musicRepository.gameInMusic.play();
        animate();
    };
    this.restart=function(){
        document.getElementById('game-over').style.display='none';
        this.people.init(0,0,30,30);
        this.enemyPool.init('enemy');
        this.people.routeMoveArr=[];
        this.enemyBulletPool.init('enemyBullet');
        this.quadTree.clear();
        this.target.clear();
        this.people.bulletPool.clear();
        this.peopleContext.clearRect(0,0,this.people.canvasWidth,this.people.canvasHeight);
        this.start();
    };
    this.gameOver=function(){
        musicRepository.failMusic.play();
        document.getElementById('game-over').style.display='block';
    };
}

function animate() {
    game.quadTree.clear();
    game.quadTree.insert(game.people);
    game.quadTree.insert(game.people.bulletPool.getPool());
    game.quadTree.insert(game.enemyPool.getPool());
    game.quadTree.insert(game.enemyBulletPool.getPool());
    game.quadTree.insert(game.target);

    detectCollision();

    if(game.target.isColliding) {
        //musicRepository.suceessMusic.play();
        game.restart();
        return;
    }

    if(game.people.move()){
        return;
    }
    game.people.bulletPool.animate();
    game.enemyPool.animate();
    game.enemyBulletPool.animate();
    requestAnimFrame( animate );
}

function detectCollision(){
    var objects = [];
    game.quadTree.getAllObjects(objects);

    for (var x = 0, len = objects.length; x < len; x++) {
        game.quadTree.findObjects(obj = [], objects[x]);

        for (y = 0, length = obj.length; y < length; y++) {
            if (objects[x].x < obj[y].x + obj[y].width &&
                objects[x].x + objects[x].width > obj[y].x &&
                objects[x].y < obj[y].y + obj[y].height &&
                objects[x].y + objects[x].height > obj[y].y) {
                if(objects[x].collidableWith === obj[y].type) {
                    objects[x].isColliding = true;
                    obj[y].isColliding = true;
                }
                else if(x!=y&&(objects[x].type=='people'||objects[x].type=='enemy') && (obj[y].type=='enemy' || obj[y].type=='people')){
                    objects[x].isObstacle=true;
                    obj[y].isObstacle=true;
                }

            }
        }
    }
}

//判断移动的方向有没有障碍物
function isObstacle(x,y,width,height){
    var left_x=parseInt(x/MAP.cell_width),
        top_y=parseInt(y/MAP.cell_height),
        right_x=parseInt((x+width)/MAP.cell_width),
        bottom_y=parseInt((y+height)/MAP.cell_height);

    return x<0 || y<0 || x+width > MAP.width || y+height> MAP.height|| MAP.arr[left_x][top_y]==1 || MAP.arr[left_x][bottom_y]==1 || MAP.arr[right_x][top_y]==1 || MAP.arr[right_x][bottom_y]==1;

}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

document.onkeydown = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};
document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};
document.getElementById('people').onclick = function(e){
    var end_x= parseInt(e.pageX/MAP.cell_width),
        end_y= parseInt(e.pageY/MAP.cell_height),
        start_x=parseInt(game.people.x/MAP.cell_width),
        start_y=parseInt(game.people.y/MAP.cell_height);
    if(start_x==end_x && start_y==end_y) {
        KEY_STATUS['space']=true;
    }
    var route=searchRoad(start_x,start_y,end_x,end_y,MAP.arr);
    game.people.isRoute=true;
    game.people.routeMoveArr=route;
};

