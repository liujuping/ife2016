/**
 * Created by wangtingdong on 16/4/24.
 */

window.onload=function(){
    var context,
        canvas,
        cellWidth=30,
        cellHeight=30,
        windowWidth=window.innerWidth,
        windowHeight=window.innerHeight,
        rows=parseInt(windowWidth/cellWidth),  //x 行
        cols=parseInt(windowHeight/cellHeight);//y 列
        //gameMap=[],
        //people;

    var obj=new Canvas(rows,cols,cellWidth,cellHeight,windowWidth,windowHeight);
    context=obj.getContext();
    canvas=obj.getCanvas();
    map=new Map(rows,cols,context,cellWidth,cellHeight);
    map.create();
    //people=map.getPeople();
    //gameMap=map.getMap();

    canvas.onclick=function (e){
        var x=parseInt((e.pageX-windowWidth%cellWidth/2)/cellWidth),
            y=parseInt((e.pageY-windowHeight%cellHeight/2)/cellHeight);
        map.movePeople(x,y);
    }
};
