/**
 * Created by wangtingdong on 16/3/22.
 */

var box=document.getElementById('box'),
    ipt=document.getElementById('ipt'),
    btn_box=document.getElementById('btn_box');

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

// 事件代理，为四个按钮绑定事件.
on(btn_box,'click',function(e){
    var str=ipt.value;

    if(!str || parseInt(str)>100 || parseInt(str)<0 || /[^0-9]/.test(str)) {
        alert('请输入0-100之间的数字');
        return;
    }
    var p=document.createElement('div'),
        text=document.createTextNode(str);
    p.appendChild(text);

    switch (e.target.id){
        case 'left_in' :
            p.setAttribute('class','moveInL');
            box.insertBefore(p,box.firstChild);
            break;
        case 'left_out':
            box.firstChild.setAttribute('class','moveOutL');
            setTimeout(function(){box.removeChild(box.firstChild)},2000);
            break;
        case 'right_in':
            p.setAttribute('class','moveInR');
            box.appendChild(p);
            break;
        case 'right_out':
            box.lastChild.setAttribute('class','moveOutR');
            setTimeout(function(){box.removeChild(box.lastChild)},2000);
            break;
    }
});

