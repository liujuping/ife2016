/**
 * Created by wangtingdong on 16/4/18.
 */

var COMMANDER_EVENT_BOX=document.getElementById('command');//指挥官事件按钮的盒子

//指挥官
var Commander=(function() {
    var _commandBox = COMMANDER_EVENT_BOX,
        _command,
        _emitMachine;
    //初始化指挥官
    function init() {
        _bindEvent();
    }

    //绑定发射命令的控制器
    function bindEmitMachine(machine) {
        _emitMachine = machine;
    }

    //绑定默认行为
    function _bindEvent() {
        on(_commandBox, 'click', function (e) {
            var target = e.target;
            //创建命令
            _createCommand(target);
            _sendCommand(_emitMachine);
        })
    }

    //发送命令到发射器
    function _sendCommand(machine) {
        //发射器执行命令
        machine.carryOutCommand(_command);
    }

    //根据行为创建命令
    function _createCommand(node) {
        _command = {};
        if (node.id == 'create_ship_btn') {
            _command = {
                command: 'create'
            }
        }
        else if(node.name=='delete') {
            _command = {
                nodeBox:node.parentNode.parentNode,
                id:node.parentNode.parentNode.getAttribute('data-id'),
                command:node.name
            }
        }
        else if (node.name == 'stop' || node.name == 'run') {
            _command = {
                id: node.parentNode.parentNode.getAttribute('data-id'),
                command: node.name
            }
        }
    }

    return {
        init: init,
        bindEmitMachine: bindEmitMachine
    }
});