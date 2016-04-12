/**
 * Created by wangtingdong on 16/3/27.
 */

var arr=[],
    box=document.getElementById('box'),
    ipt=document.getElementById('ipt'),
    btn_box=document.getElementById('btn_box'),
    search_ipt=document.getElementById('search_ipt'),
    start_search=document.getElementById('start_search');

//事件绑定
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

//绑定点击事件
on(start_search,'click',function(e) {
    var i= 0,
        str = search_ipt.value,
        rg = new RegExp(str);      //正则表达式设置模糊查询
    for (i = 0; i < arr.length; i++) {      //设置的颜色还原
        box.children[i].style.backgroundColor = 'red';
    }
    if (!str || str == '') {
        alert('查询内容为空');
        return 0;
    }
    for (i = 0; i < arr.length; i++) {
        if (rg.test(arr[i])) {           //设置满足条件的颜色为blue
            box.children[i].style.backgroundColor = 'blue';
        }
    }

});

// 事件代理，为四个按钮绑定事件.
on(btn_box,'click',function(e) {
    var str = ipt.value,
        i = 0,
        strArr = str.split(/[ ,，、 \n\t]/);   //用分割符分别存入数组

    for (i = 0; i < strArr.length; i++) {     //删除空的数组
        if (/^ *$/.test(strArr[i])) {
            strArr.splice(i, 1);
            i--;
        }
    }

    //循环把数据都放在arr
    for (i in strArr) {
        switch (e.target.id) {
            case 'left_in' :
                arr.unshift(strArr[i]);
                break;
            case 'left_out':
                arr.shift();
                break;
            case 'right_in':
                arr.push(strArr[i]);
                break;
            case 'right_out':
                arr.pop();
                break;
        }
    }
    show();
    //console.log(arr);
});

// 显示数据
function show() {
    var text = '';
    for (var index in arr) {
        text += '<div>' + arr[index] + '</div>'
    }
    box.innerHTML = text;
}