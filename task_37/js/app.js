/**
 * Created by wangtingdong on 16/4/23.
 */

var clickNode=document.getElementById('click'),     //点击的按钮
    openNode=document.getElementById('clickOpen'),  //点击后打开的按钮
    towNode=document.getElementById('towMove'),     //拖曳的目标
    closeNode1=document.getElementById('sure'),
    closeNode2=document.getElementById('cancel');


//初始化一个弹出框
var clickOpen=new ClickOpen();
clickOpen.init({
    clickNode:clickNode,                        //点击的按钮
    openNode:openNode,                          //点击之后弹出的框
    allowRoll:true,                             //是否允许弹出框出现时滚动body
    closeNode:[openNode,closeNode1,closeNode2]  //点击之后关闭弹出框的节点
});

//初始化拖曳框
var tow=new Tow();
tow.init(towNode);    //要拖曳的目标

//初始化一个缩放框
var changeSize=new ChangeSize();
changeSize.init({
    target:towNode,   //需要改变大小的DOM
    maxWidth:800,     //可以变化的最大宽度
    minWidth:150,     //可以变化的最小宽度
    maxHeight:1000,   //可以变化的最大高度
    minHeight:120     //可以变化的最小高度
});