/**
 * Created by wangtingdong on 16/4/9.
 */

var item_box=document.getElementById('item_box'),
    research_btn=document.getElementById('research'),
    search=document.getElementById('search');

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

function Tree(data){
    this.data=data;
    this.item_box=item_box;
    this.find_btn=research_btn;
    this.find_ipt=search;
    this.showArr=[];

    this.init();
}

Tree.prototype= {
    init: function () {
        var data = this.data,
            text='';
        on(this.item_box, 'click', this.event.bind(this));
        on(this.find_btn, 'click' , this.find.bind(this));
        //根节点
        text+=
            '<div id="root">' +
                '<span class="text">' + data.root +
                    '<button class="add">add</button>'+
                '</span>' +
                this.callback(data.item,1) +
            '</div>';
        this.item_box.innerHTML = text;
    },
    //利用递归初始化树的结构
    callback: function (data,i) {
        var text = '',
            className;
        for (var item in data) {
            //将第一阶的折叠 判断现在是第几层，且之后有没有下一层
            className = (i > 0 && this.callback(data[item], i + 1) != '') ? 'hide' : '';
            text +=
                '<div class="' + className + '">' +
                '<span class="text">' + item +
                '<button class="delete">delete</button>' +
                '<button class="add">add</button>' +
                '</span>' +
                this.callback(data[item], i + 1) +
                '</div>'
        }
        return text;
    },
    //特殊格式化查询的元素
    show:function(node){
        node.children[0].style.backgroundColor='red';
        node.children[0].style.color='#fff';
        this.showArr.push(node.children[0]);
        //将选择元素对应的父元素都展开
        do {
            node=node.parentNode;
            node.className='';
        }while(node.id!='item_box');
    },
    //清除之前搜索的样式
    clear:function(){
        for(var item in this.showArr) {
            this.showArr[item].style='';
        }
        this.showArr=[];
    },
    //搜索
    find:function(){
        var text=this.find_ipt.value,
            num=0;//符合条件元素的个数

        //清除之前搜索的样式
        this.clear();

        if(text==null || text =='') {
            alert('搜索内容为空！！！');
        }
        else {
            //广度遍历
            var parent = this.item_box.children[0],  //当前父元素
                parents=[];    //还没有用的元素
            do {
                if(parent.children[0].childNodes[0].data==''+text) {
                    //特殊标记搜索的选项
                    num++;
                    this.show(parent);
                }
                for (var i = 1; i < parent.children.length; i++) {
                    parents.push(parent.children[i]);
                }
                parent = parents.shift();  //取下一个父元素
            }
            while (parent);
            num==0?alert('目录下没有该内容!'):alert('找到'+num+'个元素！');
        }
    },
    //元素的事件绑定
    event: function (e) {
        switch (e.target.className) {
            //隐藏元素或者显示元素
            case 'text' :
                this.hide(e.target.parentNode);
                break;
            //添加元素
            case 'add' :
                this.add(e.target.parentNode.parentNode);
                break;
            //删除元素
            case 'delete':
                this.delete(e.target.parentNode.parentNode);
                break;
        }
    },
    //隐藏节点和显示节点
    hide:function(node){
        //判断节点有没有子元素，如果没有，则不能再隐藏
        if(node.children.length>1) {
            //如果改节点处于隐藏状态，则显示；
            node.className = node.className == 'hide' ? '' : 'hide';
        }
    },
    //删除节点
    delete:function(node){
        node.remove();
    },
    //添加节点
    add:function(node){
        var text=prompt('请输入节点内容！');
        if (text!=null && text!="")
        {
            var div=document.createElement('div');
            div.innerHTML=
                '<span class="text">' + text +
                '<button class="add">add</button>'+
                '<button class="delete">delete</button>'+
                '</span>';
            node.appendChild(div);
            //展开添加节点的父元素
            node.className='';
        }
    }
};

//树的数据结构
var data= {
    'root': 'IFE tree',
    'item': {
        'javascript': {
            'array': null,
            'number': {
                '1': null,
                '2': null,
                '3': {
                    '2': {
                        5: null
                    }
                }
            }
        },
        'animation': {
            'dog': {
                'dog1': null,
                'dog2': null,
                'dog3': null
            },
            'cat': null,
            'duck': null
        },
        '111': {
            '222': {
                '233': {
                    1:null
                },
                '234': null
            },
            '333': null
        }
    }
};

var tree=new Tree(data);