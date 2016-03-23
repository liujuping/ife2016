/**
 * Created by wangtingdong on 16/3/22.
 */

var box=document.getElementById('box');
var ipt=document.getElementById('ipt');
var btn_box=document.getElementById('btn_box');
var arr=[];

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
    //console.log(e.target.id);
    var str=parseInt(ipt.value);
    //console.log(ipt.value);
    if(!str || str>100 || str<0 || /[^0-9]/.test(str)) {
        alert('请输入0-100之间的数字');
        return;
    }
    switch (e.target.id){
        case 'left_in' :
            arr.unshift(str);
            break;
        case 'left_out':
            arr.shift();
            break;
        case 'right_in':
            arr.push(str);
            break;
        case 'right_out':
            arr.pop();
            break;
    }
    show();
    //console.log(arr);
});

function show(){
    var text='';
    for(var index in arr) {
        text+='<div>'+arr[index]+'</div>'
    }
    box.innerHTML=text;
}

//on(left_in,'click',function(){
//    arr.unshift();
//});
//on(left_out,'click',function(){
//    arr.shift();
//});
//on(right_in,'click',function(){
//    arr.push();
//});
//on(right_out,'click',function(){
//    arr.pop();
//});

