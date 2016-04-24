/**
 * Created by wangtingdong on 16/4/24.
 */
/*
 * 拖曳组件
 * */

var Tow=(function() {
    var towNode,startX,startY;

    function init(towNodeFn) {
        towNode = towNodeFn;
        towNode.setAttribute('draggable','true');
        defaultEvent();
    }

    function defaultEvent() {
        document.ondragover=preventDefault;
        document.ondrop=preventDefault;

        towNode.addEventListener('dragstart',setDataTransfer,false);
        document.addEventListener('drop',DropMove,false);
    }

    function setDataTransfer(e){
        e.dataTransfer.setData('Text',e.target.id);

        startX = e.pageX - e.target.offsetLeft;
        startY = e.pageY - e.target.offsetTop;
    }

    function preventDefault(e){
        e.preventDefault();
    }

    //根据鼠标的移动移动位置
    function DropMove(e) {
        if(e.dataTransfer.getData('Text') == towNode.id) {
            towNode.style.left = (e.pageX - startX) + 'px';
            towNode.style.top = (e.pageY - startY) + 'px';
        }
    }

    return {
        init: init
    }
});
