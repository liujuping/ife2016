/**
 * Created by wangtingdong on 16/4/11.
 */

/*var data={
    label: '名称',                    // 表单标签
    type: 'input',                   // 表单类型
    validator: function () {},       // 表单验证规
    default_text: '必填，长度为4-16个字符',   // 填写规则提示
    success_text: '格式正确',              // 验证通过提示
    fail_text: '名称不能为空'               // 验证失败提示
};*/
//表单产生

//存放需要用的id节点
var data_box={
    type_box:[$('#type_box'),'className'],   //标签名(input)，通过className格式获取
    label_box:[$('#lable_box'),'value'],     //label(姓名)名称，通过input的value获取
    necessary_box:[$('#basic_box'),'className'],   //是否必填
    input_type_box:[$('#rule_input'),'className'],   //input类型的规则如邮箱，号码等
    item_box:[$('#box_item_input'),$('#box_item_show'),document.getElementsByClassName('item')],
    min_length_box:[$('#min_length'),'value'],   //text格式的限制长度
    max_length_box:[$('#max_length'),'value'],   //限制长度的max值
    add_btn:$('#btn_add'),  //添加表单的按钮
    result_box:$('#result'),  //表单的展示区域
    submit_form:$('#submit_form')
};
//存放各个类型的validator函数
var validator= {
    'length_control': function () {
        min_length = this.data.min_length;
        max_length = this.data.max_length;
        var text = this.ipt.value;
        if (text == '') {
            if(this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
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
    },
    'number': function () {
        var text=this.ipt.value;
        if(text=='') {
            if(this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }        }
        else {
            if(/^\d*$/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
        }
        return false;
    },
    'email': function () {
        var text = this.ipt.value;
        if (text == '') {
            if(this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }        }
        else {
            if (/^[0-9a-z]+([._\\-]*[a-z0-9])*@([a-z0-9]+[a-z0-9]+.){1,63}[a-z0-9]+$/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
        }
        return false;
    },
    'phone': function () {
        var text = this.ipt.value;
        if (text == '') {
            if(this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }        }
        else {
            if (/\d{11}/.test(text)) {
                this.true_tip();
                return true;
            }
            else {
                this.error_tip(1);
            }
        }
        return false;
    },
    'radio' :function(){
        this.true_tip();
        return true;
    },
    'checkbox':function(){
        var children = this.ipt.children;
        for(var i in children) {
            if(children[i].checked) {
                this.true_tip();
                return true;
            }
        }
        if(this.data.necessary)
            this.error_tip(0);
        else {
            this.default_tip();
            return true;
        }
        return false;
    },
    'select':function() {
        this.true_tip();
        return true;
    }
};

function $(selector) {
    return document.querySelector(selector);
}

function Data_product(data_box) {
    this.box = data_box;
    this.data={};
    this.id = 0;
    this.init = function () {
        this.addEvent();
    };
    this.addEvent = function () {
        //事件代理，根据类型的选中来展示相应的表单
        on($('#data_create'), 'change', function (e) {
            if (e.target.getAttribute('type') == 'radio') {
                e.target.parentNode.className = e.target.id;

                if(!/necessary/.test(e.target.id))
                    //同步输入框中名字的设置
                    data_box.label_box[0].value = e.target.nextElementSibling.textContent;
            }
        });
    };
    //设置表单的信息
    this.getData = function () {
         var data = {
            lable: data_box.label_box[0][data_box.label_box[1]],
            type: data_box.type_box[0][data_box.type_box[1]],
            necessary: data_box.necessary_box[0][data_box.necessary_box[1]] == 'necessary',
            input_type: data_box.input_type_box[0][data_box.input_type_box[1]],
            min_length: data_box.min_length_box[0][data_box.min_length_box[1]],
            max_length: data_box.max_length_box[0][data_box.max_length_box[1]],
            default_text: '',
            success_text: '',
            item: [],
            fail_text: [],
            id: this.id++
        };
        //根据type，配置对应的数据
        switch (data.type) {
            case 'textarea' :
                data=this.getLengthRelativeData(data);
                break;
            case 'input' :
                switch (data.input_type) {
                    case 'text':
                    case 'password':
                        data=this.getLengthRelativeData(data);
                        break;
                    case 'number':
                    case 'email':
                    case 'phone':
                        data=this.getInputRelativeData(data);
                }
                break;
            case 'radio':
            case 'select':
            case 'checkbox':
                data=this.getSpecialInputRelativeData(data);
                break;
        }
        return data;
    };
    //配置radio select checkbox的信息
    this.getSpecialInputRelativeData=function(data){
        var items=data_box.item_box[2];
        for(var i=0;i<items.length;i++) {
            data.item.push(items[i].childNodes[1].data);
        }
        if(data.item.length==0) {
            alert('你还没有添加'+data.lable+'的选项');
            data=null;
        }
        else if(data.item.length==1) {
            alert('你只添加了一个选项，无法创建'+data.lable);
            data=null;
        }
        else {
            data.default_text=(data.necessary ? '必填' : '选填')+'，请选择您的' + data.lable;
            data.fail_text=[data.lable+'未选择'];
            data.success_text = data.lable+'已选择';
            data.validator = validator[data.type];
        }
        return data;
    };
    //配置text password和textarea的信息
    this.getLengthRelativeData=function(data){
        data.fail_text = [
            //'姓名不能为空','姓名长度不能小于4个字符','姓名长度不能大于16个字符'
            data.lable + '不能为空',
            data.lable + '长度不能小于' + data.min_length + '个字符',
            data.lable + '长度不能大于' + data.max_length + '个字符'
        ];
        //名称格式正确
        data.success_text = data.lable + '格式正确';
        //必填，长度为4-16个字符
        data.default_text = (data.necessary ? '必填' : '选填') + ',长度为' + data.min_length + '-' + data.max_length + '个字符';
        data.validator = validator.length_control;
        return data;
    };
    //配置Input中number，email，phone的信息
    this.getInputRelativeData=function(data){
        data.fail_text = [
            //'姓名不能为空','姓名长度不能小于4个字符','姓名长度不能大于16个字符'
            data.lable + '不能为空',
            data.lable + '格式不正确'
        ];
        //名称格式正确
        data.success_text = data.lable + '格式正确';
        //必填，长度为4-16个字符
        data.default_text = (data.necessary ? '必填' : '选填') + '，请输入您的' + data.lable;
        data.validator = validator[data.input_type];
        return data;
    };
    /*根据data在结果表单中显示相应的表单
    * 添加input表单
    * */
    this.addInputForm=function(data){
        var box = document.createElement('div');
        box.innerHTML = '<label>' + data.lable + '</label><input type="' + data.input_type + '" id="' + data.id + '"><span></span>';
        data_box.result_box.insertBefore(box , data_box.submit_form);
    };
    //添加textarea表单
    this.addTextAreaForm=function(data){
        var box = document.createElement('div');
        box.innerHTML = '<label>' + data.lable + '</label><textarea id="' + data.id + '"></textarea><span></span>';
        data_box.result_box.insertBefore(box , data_box.submit_form);
    };
    //添加radio单选框
    this.addRadioForm=function(data){
        var box = document.createElement('div'),
            text='<div id="'+data.id+'"><label class="formNameLabel" >' + data.lable + '</label>';
        box.className='radio_box';
        for(var i=0;i<data.item.length;i++) {
            var id=data.id+''+i;
            text += '<input type="radio" id="'+id+'" name="'+data.id+'"><label for="'+id+'">'+data.item[i]+'</label>';
        }
        text+='</div><span></span>';
        box.innerHTML=text;
        data_box.result_box.insertBefore(box , data_box.submit_form);
    };
    //添加checkbox多选框
    this.addCheckboxForm=function(data){
        var box = document.createElement('div'),
            text='<div id="'+data.id+'"><label class="formNameLabel" >' + data.lable + '</label>';
        box.className='radio_box';
        for(var i=0;i<data.item.length;i++) {
            var id=data.id+''+i;
            text += '<input type="checkbox" id="'+id+'" name="'+data.id+'"><label for="'+id+'">'+data.item[i]+'</label>';
        }
        text+='</div><span></span>';
        box.innerHTML=text;
        data_box.result_box.insertBefore(box , data_box.submit_form);
    };
    //添加select下拉框
    this.addSelectForm=function(data){
        var box=document.createElement('div');
        var text='<label>' + data.lable + '</label><select id="'+data.id+'">';
        for(var i=0;i<data.item.length;i++) {
            text+='<option>'+data.item[i]+'</option>'
        }
        text+='</select><span></span>';
        box.innerHTML=text;
        data_box.result_box.insertBefore(box , data_box.submit_form);
    };
    //总的添加表单的逻辑处理
    this.addForm = function (data) {
        switch (data.type) {
            case 'input':
                this.addInputForm(data);
                break;
            case 'textarea':
                this.addTextAreaForm(data);
                break;
            case 'radio':
                this.addRadioForm(data);
                break;
            case 'checkbox':
                this.addCheckboxForm(data);
                break;
            case 'select':
                this.addSelectForm(data);
        }

    };
}

var data_product=new Data_product(data_box),
    formArr=[];
data_product.init();

//绑定点击事件，点击添加按钮之后，返回表单的数据
on(data_product.box.add_btn,'click',function(){
    var data=data_product.getData();
    if(data!=null) {
        data_product.addForm(data);
        formArr.push(new Form(data));
        if(data.type=='radio'||data.type=='checkbox') {
            formArr[formArr.length-1].default_tip();
        }
    }
});

var tagIpt = new TagIpt(data_box.item_box[0],data_box.item_box[1],100);
tagIpt.init();

on(data_box.submit_form,'click',function(){
    var text='';
    for(var i=0;i<formArr.length;i++) {
        if(!formArr[i].validator()){
            text+=formArr[i].tip.textContent+'\n';
        }
    }
    if(text!='') {
        alert(text);
    }
    else {
        alert('提交成功');
    }
});

//表单验证工厂
function Form(data){
    this.data=data;
    this.ipt=document.getElementById(data.id);
    this.tip=this.ipt.nextElementSibling;
    this.is_true=data.is_true;
    this.validator=data.validator;
    this.necessary=data.necessary;

    this.init=function(){
        on(this.ipt,'focus',this.default_tip.bind(this));
        on(this.ipt,'blur',this.validator.bind(this));
        on(this.ipt,'change',this.validator.bind(this));
    };
    this.default_tip=function(){
        this.tip.innerHTML=this.data.default_text;
        this.tip.className='default';
        this.ipt.className='default';
    };
    this.true_tip=function(){
        this.tip.innerHTML=this.data.success_text;
        this.tip.className='true';
        this.ipt.className='true';
    };
    this.error_tip=function(i){
        this.tip.innerHTML=this.data.fail_text[i];
        this.tip.className='error';
        this.ipt.className='error';
    };
    this.init();
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