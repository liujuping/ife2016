## 单例模式

### 什么是单例模式

* 单例模式是指在您要确保始终只创建一个对象实例时使用的设计模式。
* 单例就是保证一个类只有一个实例

#### 为什么只创建一个对象？####

* 因为在某些系统中，只有一个对象实例很重要。例如，一个系统中可以存在多个打印任务，但是只能有一个正在工作的任务；比如操作系统的窗口，如果不对对窗口对象进行唯一化，将弹出多个窗口，如果这些窗口显示的内容完全一致，则是重复对象，浪费内存资源；
* 如果这些窗口(同一个系统)显示的内容不一致，则意味着在某一瞬间系统有多个状态，与实际不符，也会给用户带来误解，不知道哪一个才是真实的状态。因此有时确保系统中某个对象的唯一性即一个类只能有一个实例非常重要。

* 另外在javascript中，单例可让您保证命名空间对象和函数井然有序，防止它们与全局命名空间混淆。 使用命名空间单例模式也被称为模块设计模式。

#### 怎么创建单例？

规则非常简单： 如果每次创建新实例时，实例的功能均完全相同，那么将其设置为单例。

实现的方法: 一般是先判断实例存在与否，如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。

在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。

### javascript的单例模式

#### 最简单的单例模式

```
var Singleton = {
    prop: 1,
    another_prop: ‘value’,
    method: function() {…},
    another_method: function() {…}
};
```

#### 带有私有属性和方法的单例模式

```
var Singleton = (function() {
    /* 这里声明私有变量和方法 */
    var private_property = 0,
        private_method = function () {
            console.log('This is private’);
        }

    /* 公有变量和方法（可以访问私有变量和方法） */
    return {
        prop: 1,
        another_prop: ‘value’,
        method: function() {
            private_method();
            return private_property;
        },
        another_method: function() {…}
    }
}());
```

#### 只有在使用的时候才初始化的单例模式
```
var Singleton = (function () {
    var instantiated;
    function init() {
        /*这里定义单例代码*/
        return {
            publicMethod: function () {
                console.log('hello world’);
            },
            publicProperty: ‘test’
        };
    }

    return {
        getInstance: function () {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        }
    };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();
```
上面的代码用了命名空间，``` Singleton.getInstance() ``` 是一个单例对象
```
Singleton={
    getInstance: function () {
        if (!instantiated) {
            instantiated = init();
        }
        return instantiated;
    }
}
```
``` Singleton.getInstance() ```在没有用之前，单例对象没有初始化，并且用``` instantiated ```保存单例对象，之后再调用的时候直接返回的是之前的单例对象。

#### 下面的代码是一个单例的最佳实践：
```
var SingletonTester = (function () {

    //参数：传递给单例的一个参数集合
    function Singleton(args) {

        //设置args变量为接收的参数或者为空（如果没有提供的话）
        var args = args || {};
        //设置name参数
        this.name = ‘SingletonTester’;
        //设置pointX的值
        this.pointX = args.pointX || 6; //从接收的参数里获取，或者设置为默认值
        //设置pointY的值
        this.pointY = args.pointY || 10;

    }

    //实例容器
    var instance;

    var _static = {
        name: ‘SingletonTester’,

        //获取实例的方法
        //返回Singleton的实例
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
    return _static;
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX); // 输出 5
```
上面的代码创建一个了一个私有单例函数对象，通过返回的``` _static ```对象，调用其``` getInstance ```用实例容器 ``` instance ``` 指向第一个实例对象，之后都只返回其指向。

### 其它实现方式

### 方法1：

```
function Universe() {

    // 判断是否存在实例
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }

    // 其它内容
    this.start_time = 0;
    this.bang = “Big”;

    // 缓存
    Universe.instance = this;

    // 隐式返回this
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2); // true
```
判断该函数对象有没有实例，如果已经存在，返回该实例指向，不存在，初始化实例参数，然后缓存该实例。

### 方法二:
```
function Universe() {

    // 缓存的实例
    var instance = this;

    // 其它内容
    this.start_time = 0;
    this.bang = “Big”;

    // 重写构造函数
    Universe = function () {
        return instance;
    };
}

// 测试
var uni = new Universe();
var uni2 = new Universe();
uni.bang = “123”;
console.log(uni === uni2); // true
console.log(uni2.bang); // 123
```
重写构造函数，每次只返回缓存的实例

### 方法3：
```
function Universe() {

    // 缓存实例
    var instance;

    // 重新构造函数
    Universe = function Universe() {
        return instance;
    };

    // 后期处理原型属性
    Universe.prototype = this;

    // 实例
    instance = new Universe();

    // 重设构造函数指针
    instance.constructor = Universe;

    // 其它功能
    instance.start_time = 0;
    instance.bang = “Big”;

    return instance;
    // 测试
    var uni = new Universe();
    var uni2 = new Universe();
    console.log(uni === uni2); // true

    // 添加原型属性
    Universe.prototype.nothing = true;

    var uni = new Universe();

    Universe.prototype.everything = true;

    var uni2 = new Universe();

    console.log(uni.nothing); // true
    console.log(uni2.nothing); // true
    console.log(uni.everything); // true
    console.log(uni2.everything); // true
    console.log(uni.constructor === Universe); // true
}
```

### 方式4:
```
var Universe;

(function () {

    var instance;

    Universe = function Universe() {

        if (instance) {
            return instance;
        }

        instance = this;

        // 其它内容
        this.start_time = 0;
        this.bang = “Big”;
    };
} ());

//测试代码
var a = new Universe();
var b = new Universe();
alert(a === b); // true
a.bang = “123”;
alert(b.bang); // 123
```
用Universe对象来构造实例

单例模式的命名空间

```
var Namespace = {
    Util: {
        util_method1: function() {…},
        util_method2: function() {…}
    },
    Ajax: {
        ajax_method: function() {…}
    },
    some_method: function() {…}
};

// Here's what it looks like when it's used
Namespace.Util.util_method1();
Namespace.Ajax.ajax_method();
Namespace.some_method();
```