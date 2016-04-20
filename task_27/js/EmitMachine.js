/**
 * Created by wangtingdong on 16/4/18.
 */
var EMIT_MACHINE_COMMAND_BOX=document.getElementById('command');

//发射器
var EmitMachine=(function() {
    var _id = 1,
        _remandId=[],
        _shipNum= 0,
        _commandBox = EMIT_MACHINE_COMMAND_BOX;

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
        var div = document.createElement('div');
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
                console.log('消息丢失');
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
});