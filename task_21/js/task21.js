/**
 * Created by wangtingdong on 16/3/29.
 */

var tag_box=document.getElementById('tag_box'),
    tag_ipt=document.getElementById('tag_ipt'),
    lover_area=document.getElementById('lover_area'),
    lover_button=document.getElementById('lover_button'),
    lover_box=document.getElementById('lover_box');

//定义ShowTag构造器
function ShowTag(ipt,box) {
    this.arr = [];      //存放数组
    this.box = box;     //显示tag的容器
    this.ipt = ipt;     //输入框
    this.length = 10;   //显示的tag的数目
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

//ShowTag构造器方法
ShowTag.prototype= {
    // 去重
    trim: function () {
        var i = 0, j = 0;
        for (; i < this.arr.length; i++) {      //判断重复，如果元素重复就去掉该元素
            for (j = i + 1; j < this.arr.length; j++) {
                if (this.arr[i] == this.arr[j]) {
                    this.arr.splice(j, 1);
                    j--;
                }
            }
        }
        while (this.arr.length > this.length) {
            this.arr.shift();
        }
        this.show();//去重后重新显示标签
        return this;
    },
    //显示标签
    show: function () {
        var text = '';
        for (var index = 0; index < this.arr.length; index++) {
            text += '<div data-num="' + index + '" class="item"><span>点击删除</span>' + this.arr[index] + '</div>';
        }
        this.box.innerHTML = text;
        return this;
    },
    //将输入的值添加到数组中
    add: function () {
        str = this.ipt.value.split(/[ ,、， \n\t]/);   //回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔
        for (var i = 0; i < str.length; i++) {
            var item = str[i];
            if (item == '') {     //去掉空元素
            }
            else {
                this.arr.push(item);
            }
        }
        this.trim();   //调用去重函数
        return this;
    },
    //点击元素删除
    deleteEvent: function (e) {
        //事件代理，判断点击的元素
        var item = e.target.className == 'item' ? e.target : e.target.parentNode.className == 'item' ? e.target.parentNode : null;
        if (item == null) {
            return 0;
        }
        //删除第n个元素，之后重新显示元素
        this.arr.splice(item.getAttribute('data-num'), 1);
        this.show();
    }
};

//定义TagIpt构造器
function TagIpt(tag_ipt,tag_box) {
    // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
    ShowTag.call(this, tag_ipt, tag_box);
}

// 建立一个由ShowTag.prototype继承而来的TagIpt.prototype对象.
TagIpt.prototype=Object.create(ShowTag.prototype);
// 设置"constructor" 属性指向Student
TagIpt.prototype.constructor=ShowTag;

//定义TagArea构造器
function TagArea(lover_area,lover_box,btn) {
    //TagArea的特有属性
    this.btn = btn;
    ShowTag.call(this, lover_area, lover_box);
}

TagArea.prototype=Object.create(ShowTag.prototype);
TagArea.prototype.constructor=ShowTag;

TagIpt.prototype.init=function() {
    //绑定事件
    on(this.box, 'click', this.deleteEvent.bind(this));//删除元素事件的绑定
    on(this.ipt, 'keyup', this.keyUp.bind(this));    //输入框输入内容事件的绑定
    on(this.ipt, 'keydown', this.preventDefault);    //阻止输入框的默认事件
};
TagIpt.prototype.keyUp=function(e) {
    if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == '13') {
        this.add();
        this.ipt.value = '';
    }
};
TagIpt.prototype.preventDefault=function(e) {
    if (e.keyCode == '13') {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
    }
};

TagArea.prototype.init=function() {
    on(this.box, 'click', this.deleteEvent.bind(this));
    on(this.btn, 'click', this.click.bind(this));//按钮点击事件绑定
};
TagArea.prototype.click=function() {
    this.add();
    this.ipt.value = '';
};

var tagIpt = new TagIpt(tag_ipt,tag_box);
var tagArea = new TagArea(lover_area,lover_box,lover_button);

tagIpt.init();
tagArea.init();

