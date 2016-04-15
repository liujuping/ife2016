/**
 * Created by wangtingdong on 16/4/11.
 */

var form_item=[],
    submit=document.getElementById('submit'),
    data_name={
        id:'ipt_name',
        max_length:16,
        min_length:4,
        default_text:'必填，长度为4～16个字符',
        true_text:'名称格式正确',
        error_text:['姓名不能为空','姓名长度不能小于4个字符','姓名长度不能大于16个字符'],
        is_true:function(){
            min_length=this.data.min_length;
            max_length=this.data.max_length;
            var text=this.ipt.value;
            if (text == '') {
                this.error_tip(0);
            }
            else {
                var total = (/[\x00-\xff]/.test(text) ? text.match(/[\x00-\xff]/g).length : 0) + (/[^\x00-\xff]/.test(text) ? text.match(/[^\x00-\xff]/g).length * 2 : 0);
                if (total < min_length) {
                    this.error_tip(1);
                }
                else if (total > max_length) {
                    this.error_tip(2);
                }
                else {
                    this.true_tip();
                    return true;
                }
            }
            return false;
        }
    },
    data_password={
        id:'ipt_password',
        max_length:13,
        min_length:6,
        default_text:'必填，长度为6～13个字符',
        true_text:'密码可用',
        error_text:['密码不能为空','密码长度不能小于6个字符','密码长度不能大于13个字符'],
        is_true:function(){
            min_length=this.data.min_length;
            max_length=this.data.max_length;
            var text=this.ipt.value;
            if (text == '') {
                this.error_tip(0);
            }
            else {
                var total = (/[\x00-\xff]/.test(text) ? text.match(/[\x00-\xff]/g).length : 0) + (/[^\x00-\xff]/.test(text) ? text.match(/[^\x00-\xff]/g).length * 2 : 0);
                if (total < min_length) {
                    this.error_tip(1);
                }
                else if (total > max_length) {
                    this.error_tip(2);
                }
                else {
                    this.true_tip();
                    return true;
                }
            }
            return false;
        }
    },
    data_phone={
        id:'ipt_phone',
        default_text:'必填，请输入您的手机号码',
        true_text:'手机格式正确',
        error_text:['手机号码不能为空','手机号码格式错误'],
        is_true:function(){
            var text=this.ipt.value;
            if(text=='') {
                this.error_tip(0);
            }
            else {
                if(/\d{11}/.test(text)) {
                    this.true_tip();
                    return true;
                }
                else {
                    this.error_tip(1);
                }
            }

            return false;
        }

    },
    data_email={
        id:'ipt_email',
        default_text:'必填，请输入您的邮箱',
        true_text:'邮箱可用',
        error_text:['邮箱不能为空','邮箱格式错误'],
        is_true:function(){
            var text=this.ipt.value;
            if(text=='') {
                this.error_tip(0);
            }
            else {
                if(/^[0-9a-z]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/.test(text)) {
                    this.true_tip();
                    return true;
                }
                else {
                    this.error_tip(1);
                }
            }
            return false;
        }
    },
    data_repeat={
        id:'ipt_password2',
        id_repeat:'ipt_password',
        default_text:'必填，和之前密码一致',
        true_text:'密码一致',
        error_text:['密码不能为空','密码不一致'],
        is_true:function(){
            id_repeat=document.getElementById(this.data.id_repeat);
            var text=this.ipt.value,
                text_2=id_repeat.value;
            if(text=='') {
                this.error_tip(0);
            }
            else {
                if(text!=text_2) {
                    this.error_tip(1);
                }
                else {
                    this.true_tip();
                    return true;
                }
            }
            return false;
        }
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

function Form(data){
    this.data=data;
    this.ipt=document.getElementById(data.id);
    this.tip=this.ipt.nextElementSibling;
    this.is_true=data.is_true;
    this.init();
}

Form.prototype={
    init:function(){
        on(this.ipt,'focus',this.default_tip.bind(this));
        on(this.ipt,'blur',this.is_true.bind(this));
    },
    default_tip:function(){
        this.tip.innerHTML=this.data.default_text;
        this.tip.className='default';
        this.ipt.className='default';
    },
    true_tip:function(){
        this.tip.innerHTML=this.data.true_text;
        this.tip.className='true';
        this.ipt.className='true';
    },
    error_tip:function(i){
        this.tip.innerHTML=this.data.error_text[i];
        this.tip.className='error';
        this.ipt.className='error';
    }
};


form_item.push(new Form(data_name));
form_item.push(new Form(data_password));
form_item.push(new Form(data_repeat));
form_item.push(new Form(data_email));
form_item.push(new Form(data_phone));

on(submit,'click',function(){
    var text='';
    for(var i=0;i<form_item.length;i++) {
        if(!form_item[i].is_true()){
            text+=form_item[i].tip.textContent+'\n';
        }
    }
    if(text!='') {
        alert(text);
    }
    else {
        alert('提交成功');
    }
});