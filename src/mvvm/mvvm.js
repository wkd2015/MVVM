import Observer from "./observer/observer";
import Compile from "./compile/compile";

function MVVM(options) {
    let data = options.data;
    let el = document.querySelector(options.el); 
    //设置发布者
    new Observer(data, this); //MVVM对象现在为空，仅在原型链上的constructor内指向的构造函数内包含options参数
    //编译模版、同时设置对应的订阅者
    let dom = new Compile(el, this); //MVVM对象监听成功，在对应名称的属性上绑定了相关的getter&setter方法，用于更新数据
    el.appendChild(dom.nodeToFragment());
}

window.MVVM = MVVM;