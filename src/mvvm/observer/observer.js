import Dep from "./dep";

class Observer {
    constructor(data, vm) {
        this.data = data;
        this.vm = vm;
        this.walk();
    }
    defineReactive(key, val) {
        let dep = new Dep();
        Reflect.defineProperty(this.vm, key, {
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(newVal) {
                if (newVal === val) return;
                val = newVal;
                dep.notify();
            }
        })
    }
    walk() {
        let self = this;
        Object.keys(this.data).forEach(function(key) {
            self.defineReactive(key, self.data[key]);
        });
    }
}

export default Observer;