/**
 * Created by wangtingdong on 16/4/11.
 */

//存放需要用的id节点
var data_box = {
    type_box:{
        box:$('#type_box'),         //标签名（input radio textarea checkbox select）
        value:'className'           //获取方式
    },
    label_box:{
        box:$('#lable_box'),        //label名称 （如性别 姓名）
        value:'value'
    },
    necessary_box:{
        box:$('#basic_box'),        //是否必填（true false）
        value:'className'
    },
    input_type_box:{
        box:$('#rule_input'),       //input类型的规则（邮箱，号码，数字，文本，密码）
        value:'className'
    },
    item_box:[                      //showTag的参数
        $('#box_item_input'),       //inputNode
        $('#box_item_show'),        //展示选项的容器
        document.getElementsByClassName('item')],   //选项的Node节点，可以获取选项
    min_length_box:{
        box:$('#min_length'),       //有长度限制的最小长度
        value:'value'
    },
    max_length_box:{
        box:$('#max_length'),       //有长度限制的最大长度
        value:'value'
    },
    add_btn: $('#btn_add'),         //添加展示表单的按钮
    result_box: $('#result'),       //表单的展示区域
    submit_form: $('#submit_form')  //提交展示表单的按钮
};
//存放各个类型的validator函数
var validator= {
    //text password textarea
    'length_control': function () {
        min_length = this.data.min_length;
        max_length = this.data.max_length;
        var text = this.ipt.value;
        if (text == '') {
            if (this.data.necessary)
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
        var text = this.ipt.value;
        if (text == '') {
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
        else {
            if (/^\d*$/.test(text)) {
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
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
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
            if (this.data.necessary)
                this.error_tip(0);
            else {
                this.default_tip();
                return true;
            }
        }
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
    'radio': function () {
        this.true_tip();
        return true;
    },
    'checkbox': function () {
        var children = this.ipt.children;
        for (var i in children) {
            if (children[i].checked) {
                this.true_tip();
                return true;
            }
        }
        if (this.data.necessary)
            this.error_tip(0);
        else {
            this.default_tip();
            return true;
        }
        return false;
    },
    'select': function () {
        this.true_tip();
        return true;
    }
};
function $(selector) {
    return document.querySelector(selector);
}
//数据产生
function Data_product(data_box) {
    this.box = data_box;
    this.id = 0;
}
Data_product.prototype= {
    init: function () {
        //调用事件绑定函数；
        this.addEvent();
    },
    //表单之间的事件绑定;
    addEvent: function () {
        //事件代理，根据类型的选中来展示相应的表单
        on($('#data_create'), 'change', this.showTable.bind(this));
    },
    //通过data_box的box对象值，来获取相应的值
    getText:function(data_box){
        return data_box.box[data_box.value];
    },
    showTable:function(e){
        if (e.target.getAttribute('type') == 'radio') {
            e.target.parentNode.className = e.target.id;
            if (!/necessary/.test(e.target.id))
            //同步输入框中名字的设置
                this.box.label_box.box.value = e.target.nextElementSibling.textContent;
        }
    },
    //设置表单的信息获取的逻辑
    getData: function () {
        var data = {
            lable: '',              //标签名字
            type: '',               //表单类型
            necessary: true,        //是否必需
            input_type: '',         //input表单的种类
            min_length: 0,          //text之类文本的最小长度限制
            max_length: 1,          //text之类文本的最大长度限制
            default_text: '',       //获取焦点的默认提示
            success_text: '',       //输入正确的提示
            item: [],               //radio的选项
            fail_text: [],          //验证错误的提示
            id: 0,                  //表单的id，初始值为0
            validator: function () {
            } //表单的验证规则
        };

        //配置表单的必需数据
        data = this.getBaseData(data);
        //根据type，配置对应的数据
        switch (data.type) {
            case 'textarea' :
                data = this.getLengthRelativeData(data);
                break;
            case 'input' :
                switch (data.input_type) {
                    case 'text':
                    case 'password':
                        data = this.getLengthRelativeData(data);
                        break;
                    case 'number':
                    case 'email':
                    case 'phone':
                        data = this.getInputRelativeData(data);
                        break;
                }
                break;
            case 'radio':
            case 'select':
            case 'checkbox':
                data = this.getSpecialInputRelativeData(data);
                break;
        }
        console.log(data);
        return data;
    },
    //总的添加表单的逻辑处理
    addForm: function (data) {
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

    },
    //配置表单的必需数据
    getBaseData: function (data) {
        data.lable = this.getText(this.box.label_box);
        data.type = this.getText(this.box.type_box);
        data.necessary = this.getText(this.box.necessary_box) == 'necessary';
        data.input_type = this.getText(this.box.input_type_box);
        data.id = this.id++;
        return data;
    },
    //配置radio select checkbox的信息
    getSpecialInputRelativeData: function (data) {
        var items = this.box.item_box[2];
        data.item = [];//清空之前的item;
        for (var i = 0; i < items.length; i++) {
            data.item.push(items[i].childNodes[1].data);
        }
        if (data.item.length == 0) {
            alert('你还没有添加' + data.lable + '的选项');
            data = null;
        }
        else if (data.item.length == 1) {
            alert('你只添加了一个选项，无法创建' + data.lable);
            data = null;
        }
        else {
            data.default_text = (data.necessary ? '必填' : '选填') + '，请选择您的' + data.lable;
            data.fail_text = [data.lable + '未选择'];
            data.success_text = data.lable + '已选择';
            data.validator = validator[data.type];
        }
        return data;
    },
    //配置text password和textarea的信息
    getLengthRelativeData: function (data) {
        data.min_length = this.getText(this.box.min_length_box);
        data.max_length = this.getText(this.box.max_length_box);
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
    },
    //配置Input中number，email，phone的信息
    getInputRelativeData: function (data) {
        data.input_type = this.getText(this.box.input_type_box);
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
    },
    /*
     *根据data在结果表单中显示相应的表单
     * 添加input表单
     */
    addInputForm: function (data) {
        var box = document.createElement('div');
        box.innerHTML = '<label>' + data.lable + '</label><input type="' + data.input_type + '" id="' + data.id + '"><span></span>';
        this.box.result_box.insertBefore(box, this.box.submit_form);
    },
    //添加textarea表单
    addTextAreaForm: function (data) {
        var box = document.createElement('div');
        box.innerHTML = '<label>' + data.lable + '</label><textarea id="' + data.id + '"></textarea><span></span>';
        this.box.result_box.insertBefore(box, this.box.submit_form);
    },
    //添加radio单选框
    addRadioForm: function (data) {
        var box = document.createElement('div'),
            text = '';
        box.className = 'radio_box';
        text += '<div id="' + data.id + '"><label class="formNameLabel" >' + data.lable + '</label>';
        for (var i = 0; i < data.item.length; i++) {
            var id = data.id + '' + i;
            text += '<input type="radio" id="' + id + '" name="' + data.id + '"><label for="' + id + '">' + data.item[i] + '</label>';
        }
        text += '</div><span></span>';
        box.innerHTML = text;
        this.box.result_box.insertBefore(box, this.box.submit_form);
    },
    //添加checkbox多选框
    addCheckboxForm: function (data) {
        var box = document.createElement('div'),
            text = '';
        box.className = 'radio_box';
        text += '<div id="' + data.id + '"><label class="formNameLabel" >' + data.lable + '</label>';
        for (var i = 0; i < data.item.length; i++) {
            var id = data.id + '' + i;
            text += '<input type="checkbox" id="' + id + '" name="' + data.id + '"><label for="' + id + '">' + data.item[i] + '</label>';
        }
        text += '</div><span></span>';
        box.innerHTML = text;
        this.box.result_box.insertBefore(box, this.box.submit_form);
    },
    //添加select下拉框
    addSelectForm: function (data) {
        var box = document.createElement('div'),
            text = '';
        text += '<label>' + data.lable + '</label><select id="' + data.id + '">';
        for (var i = 0; i < data.item.length; i++) {
            text += '<option>' + data.item[i] + '</option>'
        }
        text += '</select><span></span>';
        box.innerHTML = text;
        this.box.result_box.insertBefore(box, this.box.submit_form);
    }
};
//表单验证工厂
function Form(data) {
    this.data = data;
    this.ipt = document.getElementById(data.id);
    this.tip = this.ipt.nextElementSibling;
    this.validator = data.validator;
    this.init();
}
Form.prototype= {
    init: function () {
        on(this.ipt, 'focus', this.default_tip.bind(this));
        on(this.ipt, 'blur', this.validator.bind(this));
        on(this.ipt, 'change', this.validator.bind(this));
    },
    default_tip: function () {
        this.tip.innerHTML = this.data.default_text;
        this.tip.className = 'default';
        this.ipt.className = 'default';
    },
    true_tip: function () {
        this.tip.innerHTML = this.data.success_text;
        this.tip.className = 'true';
        this.ipt.className = 'true';
    },
    error_tip: function (i) {
        this.tip.innerHTML = this.data.fail_text[i];
        this.tip.className = 'error';
        this.ipt.className = 'error';
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
var data_product = new Data_product(data_box),
    tagIpt = new TagIpt(data_box.item_box[0],data_box.item_box[1],100),
    formArr = [];

data_product.init();
tagIpt.init();

//绑定点击事件，点击添加按钮之后，返回表单的数据
on(data_product.box.add_btn,'click',function(){
    var data=data_product.getData();
    if(data!=null) {
        data_product.addForm(data);
        //存放表单并且将表单绑定到Form中，绑定验证函数
        formArr.push(new Form(data));
        //在表单为radio和checkbox时直接展示默认的提示
        if (data.type == 'radio' || data.type == 'checkbox') {
            formArr[formArr.length - 1].default_tip();
        }
    }
});
//提交表单按钮绑定点击事件
//点击之后判断是否都满足要求，如果没有，给出验证
on(data_box.submit_form,'click',function() {
    var text = '';
    for (var i = 0; i < formArr.length; i++) {
        console.log(formArr[i].data);
        text += !formArr[i].validator() ? formArr[i].tip.textContent + '\n' : '';
    }
    text == '' ? alert('提交成功') : alert(text);
});
