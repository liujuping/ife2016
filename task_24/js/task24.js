/**
 * Created by wangtingdong on 16/4/8.
 */

var tree_box = document.getElementById('root'),
    btn_box = document.getElementById('btn'),
    btn_speed = document.getElementById('btn_speed'),
    ipt=document.getElementById('ipt'),
    ipt_text=document.getElementById('ipt_text');

function Tree(box) {
    this.box = box;
    this.speed = 500;
    this.showArr = [];
    this.timer = null;
    this.selectNode=null;
}

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

Tree.prototype = {
    starEvent: function (Event) {
        //判断是否现在正在动画，如果在动画，点击没有效果
        if (this.timer != null) {
            alert('现在正在遍历');
            return 0;
        }
        //清空之前的样式
        this.clear();
        //初始化showArr为空
        this.showArr = [];
        switch (Event) {
            case 'deepFirst':
                this.deepFirst(this.box);
                this.show();
                break;
            case 'breadthFirst':
                this.breadthFirst(this.box);
                this.show();
                break;
            case 'deepFirstSearch':
                this.deepFirst(this.box);
                this.find();
                break;
            case 'breadthFirstSearch':
                this.breadthFirst(this.box);
                this.find();
                break;
            default :
                return;
        }
    },
    clear: function () {
        //点击之后把之前的样式清除
        for (var i = 0; i < this.showArr.length; i++) {
            this.showArr[i].className = '';
        }
        this.selectNode=null;
    },
    //动态显示搜索的过程
    find: function () {
        var i = 0,
            str = ipt.value;
        //输入框为空
        if (!str || str == '') {
            alert('请输入您要搜索的内容');
            return;
        }
        this.timer = setInterval((function () {
            //将上一次遍历的内容样式去除
            if (i) {
                this.showArr[i - 1].className = '';
            }
            //如果遍历到最后一个元素之后，即没有找到，停止timer，提示没有该内容
            if (i == this.showArr.length) {
                alert('搜索内容找不到');
                clearInterval(this.timer);
                this.timer = null;
                return;
            }
            //设置正在查找的元素的className
            this.showArr[i].className = 'select';
            //如果找到元素，停止循环，
            if (str == this.showArr[i].children[0].textContent) {
                alert('find it');
                clearInterval(this.timer);
                this.timer = null;
                return;
            }
            i++;
        }).bind(this), this.speed);
    },
    //深度遍历
    deepFirst: function (box) {
        if (box != null) {
            this.showArr.push(box);
            for (var i = 1; i < box.children.length; i++) {
                //递归函数
                this.deepFirst(box.children[i]);
            }
        }
    },
    //广度遍历
    breadthFirst: function (box) {
        //parent存放父节点，取其子节点，放在数组后面，待之后将子节点做父节点用
        var parent = box,  //当前父元素
            parents=[];    //还没有用的元素
        do {
            this.showArr.push(parent);
            for (var i = 1; i < parent.children.length; i++) {
                parents.push(parent.children[i]);
            }
            parent = parents.shift();  //取下一个父元素
        }
        while (parent);
    },
    show: function () {    //动态显示过程
        var i = 0;
        //定时器遍历数组
        this.timer = setInterval((function () {
            if (i) {
                this.showArr[i - 1].className = '';
            }
            if (i == this.showArr.length) {
                clearInterval(this.timer);
                this.timer = null;
                return;
            }
            this.showArr[i].className = 'select';
            i++;
        }).bind(this), this.speed);
    },
    //改变遍历显示的速度
    changeSpeed: function (speed) {
        this.speed = speed;
    },
    selectNodeFun:function(node){
        //清除搜索时留下的样式
        this.clear();
        this.selectNode=node;
        this.selectNode.className='select';
        this.showArr.push(this.selectNode);
    },
    deleteNode:function(){
        if(this.selectNode==null) {
            alert('您还没有选中要删除的节点！');
        }
        else {
            this.selectNode.parentNode.removeChild(this.selectNode);
        }
    },
    addNode:function(ipt){
        var txt=ipt.value;
        if(txt=='') {
            alert('节点内容不能为空！');
        }
        else if(this.selectNode==null) {
            alert('您还没有选择节点，不能添加节点！');
        }
        else {
            var div=document.createElement('div'),
                span=document.createElement('span'),
                text=document.createTextNode(txt);
            div.appendChild(span);
            span.appendChild(text);
            this.selectNode.appendChild(div);
            ipt.value='';
        }

    }
};

var tree=new Tree(tree_box);

//绑定删除节点的事件
on(change_node,'click',function(e){
    switch (e.target.id) {
        case 'deleteNode':
            tree.deleteNode();
            break;
        case 'addNode':
            tree.addNode(ipt_text);
            break;

    }
});
//绑定搜索按钮点击事件
on(btn_box,'click',function(e) {
    var child = e.target.parentNode.childNodes;
    if (e.target.parentNode.id == 'btn') {
        //开始函数 且如果当前正在动画，则不改变颜色
        if (tree.starEvent(e.target.id) == 0) {
            return;
        }
        //设置选中颜色的改变；
        for (var i = 0; i < child.length; i++) {
            child[i].className = '';
        }
        e.target.className = 'checked';
    }
});

//绑定速度按钮点击事件
on(btn_speed,'click',function(e) {
    var child = e.target.parentNode.childNodes;
    if (e.target.parentNode.id == 'btn_speed') {
        //调用改变速度函数；
        tree.changeSpeed(e.target.id);
        //设置选中颜色的改变
        for (var i = 0; i < child.length; i++) {
            child[i].className = '';
        }
        e.target.className = 'checked';
    }
});

//选择节点树的事件绑定！
on(tree_box,'click',function(e){
    tree.selectNodeFun(e.target.parentNode);
});