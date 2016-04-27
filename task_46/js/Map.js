/**
 * Created by wangtingdong on 16/4/26.
 */

var Map=(function(rows,cols,context,cellWidth,cellHeight){
    var map=[],
        status={
            NULL:0,
            OBSTACLE:1,
            ROAD:2,
            TARGET:3,
            PEOPLE:4
        },
        color=['rgb(255,230,203)','blue','rgb(255,230,203)','red','#000'],
        people,
        target,
        timer;

    //初始化地图的数据
    function initMap(){
        for(var i=0;i<rows;i++) {
            var arr=[];
            for(var j=0;j<cols;j++) {
                arr[j]=status.NULL;
            }
            map[i]=arr;
        }
    }

    //创建人
    function createPeople(){
        var x=parseInt(rows * Math.random()),
            y=0;
        map[x][y]=status.PEOPLE;
        people= {
            x:x,
            y:y
        }
    }

    //创建目标
    function createTarget(){
        var x= parseInt(rows * Math.random()),
            y= cols-1;
        map[x][y]=status.TARGET;
        target= {
            x:x,
            y:y
        }
    }

    //创建障碍物
    function createObstacle(num) {
        for (var i = 0; i < num; i++) {
            var x = parseInt(Math.random(i) * rows),
                y = parseInt(Math.random(i) * cols);

            if (map[x][y] != 0) {
                i--;
            }
            else {
                map[x][y] = status.OBSTACLE;
            }
        }
    }

    //防止障碍物完全堵住路
    function randomRoad() {
        var x=people.x,
            y=people.y;
        while (x != target.x || y != target.y) {
            if (y != target.y && Math.random() > 0.5) {
                y++;
            }
            else {
                if ((x < rows-1 && Math.random() > 0.5) || x == 0) {
                    x++;
                }
                else {
                    x--;
                }
            }
            map[x][y]==0 ? map[x][y] = status.ROAD:'';
        }
    }

    //画矩形
    function drawRect(x,y,color){
        context.fillStyle=color;
        context.fillRect(x*cellWidth,y*cellHeight,cellWidth,cellHeight);
    }

    function movePeople(x,y) {
        if (map[x][y] != status.OBSTACLE) {
            var road = new Road(people, {x: x, y: y}, map, status.OBSTACLE),
                result = road.getResult();
            clearInterval(timer);
            timer = setInterval(function () {
                if (result.length == 0) {
                    clearInterval(timer);
                    return;
                }
                var item = result.shift();
                map[people.x][people.y]=status.NULL;
                clearPeople(people.x, people.y);
                map[item.x][item.y]=status.PEOPLE;
                drawPeople(item.x, item.y);
                people.x = item.x;
                people.y = item.y;
                if(people.x==target.x && people.y==target.y){
                    create();
                }
            }, 100);
        }
    }

    function clearPeople(x,y){
        drawRect(x,y,color[map[x][y]]);
    }

    function drawPeople(x,y){
        drawRect(x,y,color[map[x][y]]);
    }


    function create(){
        initMap();
        createPeople();
        createTarget();
        randomRoad();
        createObstacle(100);
        drawMap();
    }

    function drawMap(){
        for(var i=0;i<rows;i++) {
            for(var j=0;j<cols;j++) {
                drawRect(i,j,color[map[i][j]]);
            }
        }
    }

    return {
        create:create,
        movePeople:movePeople
    }
});


