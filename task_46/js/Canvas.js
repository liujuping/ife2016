/**
 * Created by wangtingdong on 16/4/26.
 */
var Canvas = (function(rows,cols,cellWidth,cellHeight,width,height) {
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext('2d');
    var border_left=(width-rows*cellWidth)/2,
        border_top=(height-cols*cellHeight)/2;

    context.fillRect(0,0,width,height,'#000');

    context.translate(border_left,border_top);

    context.beginPath();
    //画网格
    for (var i = 1; i < rows; i++) {
        context.moveTo(cellWidth * i, 0);
        context.lineTo(cellWidth * i, cols * cellHeight);
    }
    for (i = 1; i < cols; i++) {
        context.moveTo(0, cellHeight * i);
        context.lineTo(rows * cellWidth, cellHeight * i);
    }

    context.closePath();

    context.strokeStyle = '#aaa';
    context.lineWidth = 0.3;
    context.stroke();

    document.getElementsByTagName('body')[0].appendChild(canvas);

    function getContext(){
        return context;
    }

    function getCanvas(){
        return canvas;
    }

    return {
        getContext:getContext,
        getCanvas:getCanvas
    }
});
