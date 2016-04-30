/**
 * Created by wangtingdong on 16/4/26.
 */


function searchRoad(start_x,start_y,end_x,end_y,map){
    var openList=[],closeList=[],result=[],result_index;

    openList.push({x:start_x,y:start_y,G:0});

    do{
        var currentPoint = openList.pop();
        closeList.push(currentPoint);
        var surroundPoint=SurroundPoint(currentPoint);
        for(var i in surroundPoint) {
            var item = surroundPoint[i];
            if (!(
                item.x<0 ||
                item.y<0 ||
                item.x>MAP.rows ||
                item.y>MAP.cols ||
                MAP.arr[item.x][item.y] == 1 ||
                existList(item, closeList) ||
                MAP.arr[item.x][currentPoint.y]==1 ||
                MAP.arr[currentPoint.x][item.y]==1)) {

                var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? 10 : 14);
                if (!existList(item, openList)) {
                    item['H'] = Math.abs(end_x - item.x) * 10 + Math.abs(end_y - item.y) * 10;
                    item['G'] = g;
                    item['F'] = item.H + item.G;
                    item['parent'] = currentPoint;
                    openList.push(item);
                }
                else {
                    var index = existList(item, openList);
                    if (g < openList[index].G) {
                        openList[index].parent = currentPoint;
                        openList[index].G = g;
                        openList[index].F=g+openList[index].H;
                    }

                }
            }
        }
        if(openList.length==0) {
            break;
        }
        openList.sort(sortF);
    }while(!(result_index=existList({x:end_x,y:end_y},openList)));


    if(!result_index) {
        result=[];
    }
    else {
        var currentObj=openList[result_index];
        do{
            result.unshift({
                x:currentObj.x,
                y:currentObj.y
            });
            currentObj=currentObj.parent;
        }while (currentObj.x!=start_x || currentObj.y!=start_y);

    }
    return result;

}

function sortF(a,b){
    return b.F- a.F;
}

function SurroundPoint(curPoint){
    var x=curPoint.x,y=curPoint.y;
    return [
        {x:x-1,y:y-1},
        {x:x,y:y-1},
        {x:x+1,y:y-1},
        {x:x+1,y:y},
        {x:x+1,y:y+1},
        {x:x,y:y+1},
        {x:x-1,y:y+1},
        {x:x-1,y:y}
    ]
}

function existList(point,list) {
    for(var i in list) {
        if(point.x==list[i].x && point.y==list[i].y) {
            return i;
        }
    }
    return false;
}
