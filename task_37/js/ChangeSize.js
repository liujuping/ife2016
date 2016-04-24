/**
 * Created by wangtingdong on 16/4/24.
 */
/*
 * 改变大小组件
 * */

var ChangeSize=(function() {
    var targetNode,
        clickNode,
        maxHeight,
        minHeight,
        maxWidth,
        minWidth;

    function init(data) {
        targetNode = data.target;
        maxHeight = data.maxHeight;
        minHeight = data.minHeight;
        maxWidth = data.maxWidth;
        minWidth = data.minWidth;

        defaultEvent();
    }

    function defaultEvent() {
        clickNode = createBtnNode();
        clickNode.ondrag = changeTarget;
    }

    function changeTarget(e) {
        var width= e.clientX - getElementLeft(targetNode),
            height= e.clientY - getElementTop(targetNode);

        if (width > minWidth && width < maxWidth) {
            targetNode.style.width = width + 'px';
        }

        if (height > minHeight && height < maxHeight) {
            targetNode.style.height = height + 'px';
        }
        e.preventDefault();
    }

    //获得元素与窗口左端的距离
    function getElementLeft(element) {
        var Left = element.offsetLeft,
            parent = element.offsetParent;

        while (parent != null) {
            Left += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return Left;
    }

    //获得元素与窗口顶部的距离
    function getElementTop(element) {
        var Top = element.offsetTop,
            parent = element.offsetParent;

        while (parent != null) {
            Top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return Top;
    }

    function createBtnNode() {
        var div = document.createElement('div');
        div.style =
            'position:absolute;' +
            'width:6px;' +
            'height:6px;' +
            'right:-3px;' +
            'bottom:-3px;' +
            'cursor:nw-resize';
        div.draggable = 'true';
        targetNode.appendChild(div);
        return div;
    }

    return {
        init: init
    }
});
