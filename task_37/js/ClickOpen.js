/**
 * Created by wangtingdong on 16/4/24.
 */

/*
 * 弹出框组件
 * 给点击使弹出框消失的部分添加属性  data-btn="hide"
 * */

var ClickOpen=(function() {
    var clickNode, openNode, allowRoll,closeNodeArr;

    function init(data) {
        clickNode = data.clickNode;
        openNode = data.openNode;
        allowRoll = data.allowRoll;
        closeNodeArr=data.closeNode;
        initCloseNode();
        defaultEvent();
    }

    function initCloseNode(){
        for(var i= 0;i<closeNodeArr.length;i++) {
            closeNodeArr[i].setAttribute('data-btn','hide');
        }
    }

    function defaultEvent() {
        //绑定按钮点击打开遮盖层
        clickNode.onclick = showNode;
        //在遮盖层里绑定点击事件（事件代理,使遮盖层消失）
        openNode.onclick = hideNode;
    }

    function judgeRoll(str) {
        if (!allowRoll) {
            document.body.style.overflow = str;
        }
    }

    function showNode() {
        openNode.hidden = '';
        //如果不允许滚动则弹出框时禁止滚动
        judgeRoll('hidden');
    }

    function hideNode(e) {
        var target = e.target;
        if (target.getAttribute('data-btn') == 'hide') {
            openNode.hidden = 'hidden';
            //更改背景框的滚动
            judgeRoll('');
        }
    }

    return {
        init: init
    }

});
