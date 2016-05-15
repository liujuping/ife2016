/**
 * Created by wangtingdong on 16/5/4.
 */

var status={
    NULL:0,     //空地值
    OBSTACLE:1  //障碍物值
};

function randomMap(map,rows,cols){
    map=[];
    for(var i=0;i<rows;i++) {
        var arr=[];
        for(var j=0;j<cols;j++) {
            arr[j]=0;
        }
        map[i]=arr;
    }

    map=randomRoad(map,rows,cols);
    map=createObstacle(map,rows,cols,rows*cols/2);
    return map;
}

//随机创建障碍物
function createObstacle(map,rows,cols,num) {
    for (var i = 0; i < num; i++) {
        var x = parseInt(Math.random(i) * rows),
            y = parseInt(Math.random(i) * cols);

        if (map[x][y] != 0) {
            i--;
        }
        else {
            map[x][y] = 1;
        }
    }
    return map;
}

//随机一段路，保证目标是能达到的
function randomRoad(map,rows,cols){
    var x=0, y= 0;
    while (x!=rows-2 || y != cols-2) {
        map[x][y]=2;
        if (y!=cols-2 && Math.random() > 0.7) {
            y++;
        }
        else {
            if ((x < rows-2 && Math.random() > 0.5) || x == 0) {
                x++;
            }
            else {
                x--;
            }
        }
    }
    map[x][y]=2;
    return map;
}