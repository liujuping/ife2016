/**
 * Created by wangtingdong on 16/4/24.
 */

var BASE_WIDTH=30,
    BASE_HEIGHT=30;

var game=(function(){
    var map_arr=[],
        map_width,
        map_height,
        ctx,
        base_width=BASE_WIDTH,
        base_height=BASE_HEIGHT,
        max_x,
        max_y,
        init_x,
        init_y= 0,
        target_x,
        target_y;

    function initMap(){
        for(var i=0;i<max_x;i++) {
            var arr=[];
            for(var j=0;j<max_y;j++) {
                arr[j]=0;
            }
            map_arr[i]=arr;
        }
    }

    function init(data){
        ctx=data.ctx;
        map_width=ctx.width;
        map_height=ctx.height;
        max_x=parseInt(map_width/base_width);
        max_y=parseInt(map_height/base_height);
        init_x=parseInt(max_x/2);
        target_x=parseInt(max_x/2);
        target_y=max_y-1;

        newGame();
    }

    function newGame(){
        initMap();
        background.updateBackground();
        file.createFile();
        people.createPeople();
    }

    function drawRect(x,y,width,height,color){
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.fillRect(x*base_width,y*base_height,width,height);
        ctx.closePath();
    }

    var people=(function(){
        var color='red';
        function createPeople(){
            drawRect(init_x,init_y,base_width,base_height,color);
        }

        function findRoad(x,y){
            
        }
        return {
            createPeople:createPeople
        }
    })();

    var file=(function(){
        var color='red';
        function createFile(){
            drawRect(target_x,target_y,base_width,base_height,color);
        }
        return {
            createFile:createFile
        }
    })();

    //关于背景的设置
    var background=(function(){

        function updateBackground(){
            drawBackground();
            ctx.save();
            ctx.translate((map_width%base_width)/2,(map_height%base_height)/2);
            randomRoad();
            randomObstacle(100);
            //ctx.restore();
        }

        function drawBackground(){
            drawRect(0,0,map_width,map_height,'rgb(250,230,203)');
        }

        function randomRoad(){
            var move={
                x:init_x,
                y:init_y
            };
            map_arr[move.x][move.y]=2;
            while(move.x!=target_x || move.y!=target_y) {
                if(move.y!=target_y && Math.random()>0.5) {
                    move.y++;
                }
                else {
                    if((move.x<max_x-1 && Math.random()>0.5) || move.x==0) {
                        move.x++;
                    }
                    else {
                        move.x--;
                    }
                }
                map_arr[move.x][move.y]=2;
            }
        }

        function randomObstacle(num){
            for(var i=0;i<num;i++) {
                var x=parseInt(Math.random(i)*max_x),
                    y=parseInt(Math.random(i)*max_y);

                if(map_arr[x][y]==2 || map_arr[x][y]==1) {
                    i--;
                }
                else {
                    map_arr[x][y]=1;
                    drawRect(
                        x,
                        y,
                        base_width,
                        base_height,
                        'blue'
                    );
                }
            }
        }

        return {
            updateBackground:updateBackground
        }

    })();

    return {
        init:init
    }

})();

var canvas=(function(){
    var canvas=document.getElementById('canvas');
    canvas.width=canvas.offsetWidth;
    canvas.height=canvas.offsetHeight;
    var ctx=canvas.getContext('2d');
    ctx.width=canvas.offsetWidth;
    ctx.height=canvas.offsetHeight;

    return {
        ctx:ctx,
        canvas:canvas
    };
})();

game.init(canvas);


