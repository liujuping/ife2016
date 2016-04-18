#  task 26 设计

* 虚拟宇宙
	* 行星
    	* 指挥官(指挥官可以通过行星上的信号发射器发布如下命令)
    		* 指令数据格式
    		```
    		{
    			id:1,
    			commond:'stop'/'create'/'delete'/'start'
    		}
    		```
    		* 命令：
    			* start:飞行
    			* stop:停止飞行
    			* create:创建飞船
    			* delete:删除飞船
    		* 发送命令：有30%的信息传送失败（丢包）概率，你需要模拟这个丢包率，另外每次信息正常传送的时间需要1秒
	* 飞船
    	* 属性——能源、速度
    	* 状态——飞行中、停止
    	* 系统——
    		* 动力系统
        		* 行为——飞行(围绕行星做环绕运动)、停止飞行
    		* 能源系统——提供能源，并且在宇宙中通过太阳能充电（比如每秒增加2%，具体速率自定）
    		* 信号接收处理系统——用于接收行星上的信号
    		* 自爆系统——用于自我销毁



> 在实际的编码中也没有必要刻意去使用一些设计模式。就如同tokyo hot 32式一样，在一场友好的papapa过程中，没有必要去刻意使用某种姿势。一切还是看需求和感觉。

#### [单例模式](http://www.alloyteam.com/2012/10/common-javascript-design-patterns/)

产生一个类的唯一实例

#### [工厂模式](https://segmentfault.com/a/1190000000491074)

#### [观察者模式](http://blog.csdn.net/yingyiledi/article/details/26725795)

#### [适配器模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-adapter-mode/)

#### [代理模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-proxy-mode/)

#### [外观模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-appearance-mode/)

#### [策略模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-strategy-mode/)

策略模式的意义是定义一系列的算法，把它们一个个封装起来，并且使它们可相互替换。

#### [模式方法模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-template-method-pattern/)

#### [中介者模式](http://www.alloyteam.com/2012/10/javascript-design-pattern-intermediary-model/)

#### [迭代器模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-iterator-mode/)

迭代器模式提供一种方法顺序访问一个聚合对象中各个元素，而又不需要暴露该方法中的内部表示。
js中我们经常会封装一个each函数用来实现迭代器。

#### [组合模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-combined-mode/)

使得用户只需要操作最上层的接口，就可以对所有成员做相同的操作。

#### [备忘录模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-memorandum-mode/)

常用于数据缓存

#### [职责链模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-duty-chain/)

职责链模式是一个对象A向另一个对象B发起请求，如果B不处理，可以把请求转给C，如果C不处理，又可以把请求转给D。一直到有一个对象愿意处理这个请求为止。

#### [享元模式](http://www.alloyteam.com/2012/10/commonly-javascript-design-patterns-flyweight/)

