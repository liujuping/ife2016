/**
 * Created by wangtingdong on 16/4/18.
 */

var SHIP_INIT_RESOURCE=100,    //飞船初始状态的能源百分比
    SHIP_UNIVERSE_NODE=document.getElementById('universe'),
    SHIP_RESOURCE_CONSUME_SPEED=200,
    SHIP_RESOURCE_PRODUCT_SPEED=500;

var Ship=(function(id) {
    var _resource = SHIP_INIT_RESOURCE,
        _universe = SHIP_UNIVERSE_NODE,
        _resourceReduceSpeed = SHIP_RESOURCE_CONSUME_SPEED,
        _produceReduceSpeed = SHIP_RESOURCE_PRODUCT_SPEED,
        _id = id,
        _resourceShowNode,
        _statusShowNode,
        _shipNode;

    function init() {
        //创建该飞船
        //创建飞船之后，复制飞船的节点和显示能源的节点显示状态节点
        _createShipNode();
        _shipNode=_universe.lastElementChild;
        _resourceShowNode = _shipNode.children[1];
        _statusShowNode = _shipNode.children[2];
        //启动能源系统
        energySystem.systemStart();
    }

    //在HTML中创建飞船
    function _createShipNode() {
        var div = document.createElement('div'),
            text = '<span class="ship-name">' + _id + '号</span> <span id="' + _id + 'energy">' + _resource + '%</span><span class="status" id="status' + _id + '">stop</span>';
        div.className = 'ship';
        div.id = 'ship' + _id;
        div.innerHTML = text;
        _universe.appendChild(div);

        return div;
    }

    //动力系统
    var powerSystem = (function () {
        var _status = 'stop',//run wait
            _consumeTimer,
            _monitorTimer;
        //监控能源
        function _monitorResource() {
            //判断是否已经存在监控
            if (_monitorTimer) {
                return;
            }
            _monitorTimer = setInterval(function () {
                if (_resource < 0) {
                    //动力系统处于等待状态
                    powerSystem.systemWait();
                }
                else if (_resource == 100) {
                    //动力系统重启
                    powerSystem.systemStart();
                }
            }, 1000);
        }

        //停止能源监控
        function _stopMonitorResource() {
            clearInterval(_monitorTimer);
            _monitorTimer = 0;
        }

        //改变状态
        function _changeStatus(status) {
            _status = status;
            _statusShowNode.innerText = status;
        }

        //能源消耗
        function _consumeResource() {
            if (_consumeTimer) {
                return;
            }
            _consumeTimer = setInterval(function () {
                _resource -= 3;
            }, _resourceReduceSpeed * 3);
        }

        //能源消耗停止
        function _stopConsumeResource() {
            clearInterval(_consumeTimer);
            _consumeTimer = 0;
        }

        //船起飞
        function _shipTakeOff() {
            _shipNode.setAttribute('data-status', "run");
        }

        //船停止
        function _shipStop() {
            _shipNode.setAttribute('data-status', "pause");
        }

        //启动系统
        function systemStart() {
            //判断是否现在系统在运行
            if (_status == 'run') {
                return 0;
            }
            //修改状态
            _changeStatus('run');
            //船起飞
            _shipTakeOff();
            //能源开始消耗
            _consumeResource();
            //监控能源
            _monitorResource();
        }

        //停止系统
        function systemStop() {
            //关闭能源消耗
            _stopConsumeResource();
            //关闭系统监控
            _stopMonitorResource();
            //飞船停止飞行
            _shipStop();
            //系统处于停止状态
            _changeStatus('stop');
        }

        //系统处于待机
        function systemWait() {
            //飞船停止运行
            _shipStop();
            //能源停止消耗
            _stopConsumeResource();
            //系统处于等待状态；
            _changeStatus('wait');
        }

        return {
            systemStart: systemStart,
            systemStop: systemStop,
            systemWait: systemWait
        }
    })();

    //能源系统
    var energySystem = (function () {
        var productTimer;
        //产生资源
        function _productResource() {
            if (productTimer) {
                return;
            }
            productTimer = setInterval(function () {
                _resource += 5;
                if (_resource > 100) {
                    _resource = 100;
                }
                _updateResource();
            }, _produceReduceSpeed * 5);
        }

        //停止产生资源
        function _stopProductResource() {
            clearInterval(productTimer);
        }

        //更新资源的显示
        function _updateResource() {
            _resourceShowNode.innerHTML = _resource + '%';
        }

        //启动系统
        function systemStart() {
            //开始产生资源
            _productResource();
        }

        //系统停止
        function systemStop() {
            //停止产生资源
            _stopProductResource();
        }

        return {
            systemStart: systemStart,
            systemStop: systemStop
        }
    })();

    //信号接收处理系统
    var signalSystem = {
        receive_signal: function (command) {
            if (command.id == _id) {
                switch (command.command) {
                    case 'run':
                        powerSystem.systemStart();
                        break;
                    case 'stop':
                        powerSystem.systemStop();
                        break;
                    case 'delete' :
                        selfDestroySystem.systemStart();

                }
            }
        }
    };

    //自爆系统
    var selfDestroySystem = {
        systemStart: function () {
            powerSystem.systemStop();
            energySystem.systemStop();
            _shipNode.remove();
        }
    };

    return {
        id:_id,
        init: init,
        receive_signal: signalSystem.receive_signal
    }
});
