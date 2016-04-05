/**
 * Created by wangtingdong on 16/3/30.
 */

var tree_box=document.getElementById('root'),
    btn_box=document.getElementById('btn');
/*var nodeObj = {
    value:root,
    left:{
        value:node,
        left:{},
        right:{}
    },
    right: {
        value: node,
        left: {},
        right: {}
    };*/
function Tree(box){
    this.box=box;
    this.nodeObj={};
    this.className=['left','right'];
    this.speed=500;
    this.showArr=[];
    this.color='red';

    this.init();
}

//绑定事件函数
function on(element,eventName,listener){
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

Tree.prototype = {
    init:function(){
        this.nodeObj = this.addNode(this.box);
    },
    starEvent:function(Event){
        this.showArr=[];
        switch (Event) {
            case 'preOrder':
                this.preOrder(this.nodeObj);
                break;
            case 'inOrder':
                this.inOrder(this.nodeObj);
                break;
            case 'postOrder':
                this.postOrder(this.nodeObj);
                break;
            default :return;
        }
        this.show();
    },
    addNode:function(node){
        var nodeObj={};
        nodeObj.value=node;
        if(node.children[0] && node.children[0].className==this.className[1]) {
            nodeObj.left = null;
            nodeObj.right = this.addNode(node.children[0]);
        }
        else{
            nodeObj.left= node.children[0]?this.addNode(node.children[0]):null;
            nodeObj.right= node.children[1]?this.addNode(node.children[1]):null;
        }
        return nodeObj;
    },
    preOrder:function(nodeObj){
        if(nodeObj!=null) {
            this.showArr.push(nodeObj.value);
            this.preOrder(nodeObj.left);
            this.preOrder(nodeObj.right);
        }
    },
    inOrder:function(nodeObj){
        if(nodeObj!=null) {
            this.inOrder(nodeObj.left);
            this.showArr.push(nodeObj.value);
            this.inOrder(nodeObj.right);
        }
    },
    postOrder:function(nodeObj) {
        if(nodeObj!=null) {
            this.postOrder(nodeObj.left);
            this.postOrder(nodeObj.right);
            this.showArr.push(nodeObj.value);
        }
    },
    show:function(){
        var i= 0,timer;
        this.color = (this.color=='red') ? 'blue' : 'red';
        console.log(this.color);
        //console.log(color);
        console.log(this.showArr);
        timer=setInterval((function(){
            if(i==this.showArr.length) {
                clearInterval(timer);
                return;
            }
            this.showArr[i].style.backgroundColor=this.color;
            i++;
        }).bind(this),this.speed);
    }
};

var tree=new Tree(tree_box);

on(btn_box,'click',function(e){
    tree.starEvent(e.target.id);
});