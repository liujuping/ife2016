/**
 * Created by wangtingdong on 16/4/11.
 */

var data={
    label: '名称',                    // 表单标签
        type: 'input',                   // 表单类型
    validator: function () {},    // 表单验证规
    rules: '必填，长度为4-16个字符',    // 填写规则提示
        success: '格式正确',              // 验证通过提示
    fail: '名称不能为空'               // 验证失败提示
};

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