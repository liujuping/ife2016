/**
 * Created by wangtingdong on 16/4/23.
 */
/*
* 弹出框组件
* 给点击使弹出框消失的部分添加属性  data-btn="hide"
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
        clickNode.onclick=showNode;
        //在遮盖层里绑定点击事件（事件代理）
        openNode.onclick=hideNode;
    }

    function showNode() {
        openNode.hidden='';
    }

    function hideNode(e){
        var target= e.target;
        if(target.getAttribute('data-btn')=='hide') {
            openNode.hidden='hidden';
        }
    }

    return {
        init:init
    }

});

/*
* 拖曳组件
* */

var Tow=(function() {
    var towNode, startX, startY;

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
        document.ondragover = dragOverEvent;
    }

    function dragOverEvent(e) {
        e.preventDefault();
    }

    //记录每次拖曳之前鼠标点击在元素的相对位置
    function recodeStartLocation(e) {
        startX = e.pageX - getElementLeft(e.target);
        startY = e.pageY - getElementTop(e.target);
    }

    //获得元素与窗口左端的距离
    function getElementLeft(element){
        var Left=element.offsetLeft;
        var parent=element.offsetParent;

        while(parent!=null) {
            Left+=parent.offsetLeft;
            parent=parent.offsetParent;
        }

        return Left;
    }

    //获得元素与窗口顶部的距离
    function getElementTop(element) {
        var Top=element.offsetTop;
        var parent=element.offsetParent;

        while(parent!=null) {
            Top+=parent.offsetTop;
            parent=parent.offsetParent;
        }
        return Top;
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

var clickNode=document.getElementById('click'), //点击的按钮
    openNode=document.getElementById('clickOpen'), //点击后打开的按钮
    towNode=document.getElementById('towMove'); //拖曳的目标

//初始化一个弹出框
var clickOpen=new ClickOpen();
clickOpen.init(clickNode,openNode);

//初始化拖曳框
var tow=new Tow();
tow.init(towNode);