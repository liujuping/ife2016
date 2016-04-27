/**
 * Created by wangtingdong on 16/4/26.
 */

var Road=(function(start,end,map,OBSTACLE){
    var openList=[],closeList=[];

    start['G']=0;
    openList.push(start);

    do{
        var currentPoint = openList.pop();
        closeList.push(currentPoint);
        var surroundPoint=SurroundPoint(currentPoint);
        for(var i in surroundPoint) {
            var item = surroundPoint[i];
            if (!(
                item.x<0 ||
                item.y<0 ||
                item.x>(map.length-1) ||
                item.y>(map[1].length-1) ||
                map[item.x][item.y] == OBSTACLE ||
                existList(item, closeList) ||
                map[item.x][currentPoint.y]==OBSTACLE ||
                map[currentPoint.x][item.y]==OBSTACLE)) {
                var g = currentPoint.G + ((currentPoint.x - item.x) * (currentPoint.y - item.y) == 0 ? 10 : 14);
                if (!existList(item, openList)) {
                    item['H'] = Math.abs(end.x - item.x) * 10 + Math.abs(end.y - item.y) * 10;
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
            alert('傻逼过不去');
            break;
        }
        openList.sort(sortF);    }while(!existList(end,openList));

    function getResult(){
        var result=[],
            index=existList(end,openList);
        if(!index) {
            result=[];
        }
        else {
            var currentObj=openList[index];
            do{
                result.unshift({
                    x:currentObj.x,
                    y:currentObj.y
                });
                currentObj=currentObj.parent;
            }while (currentObj!=start);

        }
        return result;
    }

    return {
        getResult:getResult
    }
});

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
