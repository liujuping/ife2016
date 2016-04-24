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
        minWidth,
        recordTarget='',
        startX,
        startY,
        startWidth,
        startHeight;

    function init(data) {
        targetNode = data.target;
        maxHeight = data.maxHeight;
        minHeight = data.minHeight;
        maxWidth = data.maxWidth;
        minWidth = data.minWidth;

        defaultEvent();
    }

    function defaultEvent() {
        document.ondragover=preventDefault;
        document.ondrop=preventDefault;

        clickNode = createBtnNode();
        clickNode.addEventListener('dragstart',setDataTransfer,false);
        clickNode.addEventListener('dragstart',recordData,false);
        document.addEventListener('dragover',changeTarget,false);
        document.addEventListener('drop',clearRecord,false);
    }

    function preventDefault(e){
        e.preventDefault();
    }

    function recordData(e){
        recordTarget= e.target.id;
        startX= e.pageX;
        startY= e.pageY;
        startWidth=targetNode.offsetWidth;
        startHeight=targetNode.offsetHeight;
    }

    function setDataTransfer(e){
        e.dataTransfer.setData('Text',e.target.id);
    }

    function changeTarget(e) {
        if (clickNode.id == recordTarget) {
            var width = e.pageX - startX + startWidth,
                height = e.pageY - startY + startHeight;

            if (width > minWidth && width < maxWidth) {
                targetNode.style.width = width + 'px';
            }
            if (height > minHeight && height < maxHeight) {
                targetNode.style.height = height + 'px';
            }
        }

    }

    function clearRecord(){
        recordTarget='';
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
        div.id='changeSizeBtn';
        targetNode.appendChild(div);
        return div;
    }

    return {
        init: init
    }
});
