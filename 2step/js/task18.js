/**
 * Created by wangtingdong on 16/3/22.
 */

var box=document.getElementById('box'),
    ipt=document.getElementById('ipt'),
    btn_box=document.getElementById('btn_box'),
    obj=box.children,
    moveNum=[0,0];

function on(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on'+eventName,listener);
    }
    else {
        element['on'+eventName]=listener;
    }
}

//移出事件
function moveOut(name) {
    if(obj.length==0) {
        alert('数据为空，不能再移出');
        return 0;
    }

    /*
     * moveNum处理，当多次点击动画时，出现无法找到适当节点
     *
     * moveNum［0］＝ n 记录左侧有多少正在处于离开的节点，但是还没有被移除节点，下一次再点击动画时，处理的是子节点的第n个
     * */
    if(name=='left_out') {
        obj[moveNum[0]].className='moveOutL';          //设置移出的动画
        setTimeout(function(){
            box.removeChild(box.firstElementChild);
            moveNum[0]--;
        },2000);     //动画完成之后将节点删除
        moveNum[0]++;
    }
    else if(name=='right_out') {
        obj[obj.length-moveNum[1]-1].setAttribute('class','moveOutR');
        setTimeout(function(){
            box.removeChild(box.lastElementChild);
            moveNum[1]--;
        },2000);
        moveNum[1]++;
    }
}


//进入事件
function moveIn(name){
    var value = ipt.value;    //如果num存在，则value＝num，否则值取输入框的值
    //判断输入的值是否符合要求
    if(!value || parseInt(value)>100 || parseInt(value)<0 || /[^0-9]/.test(value)) {
        alert('请输入0-100之间的数字');
        return;
    }
    var p=document.createElement('div'),
        text=document.createTextNode(value);
    p.appendChild(text);

    if(name=='left_in') {
        p.setAttribute('class','moveInL');       //设置移入动画
        box.insertBefore(p,box.firstChild);      //在容器中插入节点
    }
    else if(name=='right_in') {
        p.setAttribute('class','moveInR');
        box.appendChild(p);
    }
}

// 事件代理，为四个按钮绑定事件.
on(btn_box,'click',function(e){
    var event= e.target.id;    //点击的按钮的id值，便于获取点击按钮名称
    switch(event) {
        case 'left_in':
        case 'right_in':
            moveIn(event);      //移入事件
            break;
        case 'left_out':
        case 'right_out':
            moveOut(event);     //移出事件
            break;
    }
});

