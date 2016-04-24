/**
 * Created by wangtingdong on 16/4/24.
 */
/*
 * 拖曳组件
 * */

var Tow=(function() {
    var towNode;

    function init(towNodeFn) {
        towNode = towNodeFn;
        towNode.draggable = 'true';
        defaultEvent();
    }

    function defaultEvent() {
        //当放下拖曳的位置时更改位置
        towNode.ondragend = DropMove;
        //取消拖曳的默认事件
        document.ondragover = dragOverEvent;
    }

    function dragOverEvent() {
        return false;
    }

    //根据鼠标的移动移动位置
    function DropMove(e) {
        var left = e.clientX,
            top = e.clientY - towNode.offsetHeight,
            maxLeft = document.body.offsetWidth - towNode.offsetWidth,
            maxTop = document.body.offsetHeight - towNode.offsetHeight;
        if (e.target.id == towNode.id && left > 0 && top > 0 && left < maxLeft && top < maxTop) {
            towNode.style.left = left + 'px';
            towNode.style.top = top + 'px';
        }
    }

    return {
        init: init
    }
});
