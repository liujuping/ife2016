/**
 * Created by wangtingdong on 16/4/23.
 */

//绑定事件函数
function on(element,eventName,listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + eventName, listener);
    }
    else {
        element['on' + eventName] = listener;
    }
}

/*
* 弹出框组件
* */

var ClickOpen=(function(){
    var clickNode,openNode;

    function init(clickNodeFn,openNodeFn) {
        clickNode=clickNodeFn;
        openNode=openNodeFn;

        defaultEvent();
    }
    function defaultEvent(){
        openNode.hidden='hidden';
        on(clickNode,'click',showNode.bind(this,openNode));
        //在遮盖层里绑定点击事件
        on(openNode,'click',isHide)
    }

    function showNode(node) {
        node.hidden='';
    }

    function isHide(e){
        var target= e.target;
        if(target.getAttribute('data-btn')=='hide') {
            hideNode(openNode);
        }
    }

    function hideNode(node){
        node.hidden='hidden';
    }

    return {
        init:init
    }

});

/*
* 拖曳组件
* */

var Tow=(function() {
    var towNode,
        startX,
        startY;

    function init(towNodeFn) {
        towNode = towNodeFn;
        towNode.draggable='true';
        defaultEvent();
    }

    function defaultEvent() {
        //记录每次拖曳之前鼠标点击在元素的相对位置
        towNode.ondragstart = recodeStartLocation;
        //当放下拖曳的位置时更改位置
        document.ondrop = DropMove;
        //取消拖曳的默认事件
        document.ondragover = deleteDefaultEvent;
    }

    function deleteDefaultEvent() {
        return false;
    }

    //记录每次拖曳之前鼠标点击在元素的相对位置
    function recodeStartLocation(e) {
        startX = e.pageX - e.target.offsetLeft;
        startY = e.pageY - e.target.offsetTop;
    }

    //根据鼠标的移动移动位置
    function DropMove(e) {
        towNode.style.left = (e.pageX - startX) + 'px';
        towNode.style.top = (e.pageY - startY) + 'px';
    }

    return {
        init: init
    }
});


var clickNode=document.getElementById('click'),
    openNode=document.getElementById('clickOpen');

//初始化一个弹出框
var clickOpen=new ClickOpen();
clickOpen.init(clickNode,openNode);
clickNode.click();

var towNode=document.getElementById('towMove');

var tow=new Tow();
tow.init(towNode);