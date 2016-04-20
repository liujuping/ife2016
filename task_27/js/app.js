/**
 * Created by wangtingdong on 16/4/15.
 */

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


var commander=new Commander();
var emitMachine=new EmitMachine();
//初始化指挥官
commander.init();
//绑定发射器，使指挥官能发送命令到发射器
commander.bindEmitMachine(emitMachine);


