import Dep from "./dep";

//为每一个属性添加了getter和setter一旦获取属性值或者为属性赋值就会触发 get 或 set ，
//当触发了 set，即model变化，就可以发布一个消息，通知所有viewModel 更新著作权归作者所有。
class Observer {
    constructor(data, vm) {
        this.data = data;
        this.vm = vm; //在构造时传入的vm为MVVM对象，此时未赋值
        this.walk();
    }
    defineReactive(key, val) { //给传入的vm对象(MVVM)每个属性定义getter、setter函数以及赋予options里的属性值
        let dep = new Dep(); //建立dep实例，利用dep.subs数组保存要监听的元素实例
        Reflect.defineProperty(this.vm, key, {
            get() {
                // console.log(Dep.target);
                Dep.target && dep.addSub(Dep.target); 
                //在Watch实例进行update动作时会通过读取vm(MVVM)实例的属性值触发这里的get,从而将此时保存着watch实例的Dep.target对象保存入数组里
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                dep.notify(); //发布者发起通知，所有订阅者检测更新
            }
        })
    }
    walk() {
        let self = this;
        Object.keys(this.data).forEach(function(key) {
            self.defineReactive(key, self.data[key]); //对data里面的数据设置观察，触发条件时发布消息，触发更新
        });
    }
}

export default Observer;