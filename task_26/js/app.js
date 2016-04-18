/**
 * Created by wangtingdong on 16/4/15.
 */

function $(id) {
    return document.getElementById(id);
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

//指挥官
var commander=(function() {
    var _commandBox = $('command'),
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
})();

//发射器
var emitMachine=(function() {
    var _id = 1,
        _remandId=[],
        _shipNum=0;
        _ship=[];//空间中的飞船

    //执行命令
    function carryOutCommand(command) {
        switch (command.command) {
            case 'create':
                _addShip(command);
                break;
            case 'delete':
                _deleteShip(command);
                break;
            case 'run':
            case 'stop':
                _changeShipStatus(command);
                break;
        }
    }

    //改变飞船状态
    function _changeShipStatus(command){
        _sendMessage({
            id:command.id,
            command:command.command
        });
    }

    //删除飞船
    function _deleteShip(command){
        _remandId.push(Number(command.id));
        //像飞船发送广播命令
        _sendMessage({
            id:command.id,
            command:command.command
        });
        //删除对改飞船的控制
        _deleteShipCommandBox(command.nodeBox);
        _shipNum--;
    }

    //发射一个新的飞船
    function _addShip() {
        if(_shipNum==4) {
            alert('不能创建超过四个飞船');
            return;
        }
        var id;
        if (_remandId.length == 0) {
            id=_id++;
        }
        else {
            id = _remandId.shift();
        }

        var ship = new Ship(id);
        ship.init();
        _ship.push(ship);
        _shipNum++;
        //添加改飞船的命令
        _addShipCommandBox(id);
    }

    //添加相应ship的命令按钮
    function _addShipCommandBox(id) {
        var div = document.createElement('div'),
            _commandBox = $('command');
        text = '<label>对' + id + '号飞船下达指令：</label> <span class="command-btn"> <button class="run" name="run" type="button">开始飞行</button> <button class="stop" name="stop" type="button">停止飞行</button> <button class="delete" name="delete" type="button">销毁</button> </span>';

        div.className = 'command-obj';
        div.setAttribute('data-id', id);
        div.innerHTML = text;
        _commandBox.insertBefore(div, _commandBox.lastElementChild);
    }

    //删除相应的ship控制按钮
    function _deleteShipCommandBox(node){
        node.remove();
    }

    //发送信息
    function _sendMessage(Message) {
        setTimeout(function(){
           //模拟丢包率，如果小于0.3则丢包，数据传不到飞船上
            if(Math.random()<0.3) {
                return;
            }

            for (var i = 0; i < _ship.length; i++) {
                _ship[i].receive_signal(Message);//模拟丢包率
            }
        },1000);
    }

    return {
        carryOutCommand: carryOutCommand
    }
})();

//初始化指挥官
commander.init();
//绑定发射器，使指挥官能发送命令到发射器
commander.bindEmitMachine(emitMachine);


