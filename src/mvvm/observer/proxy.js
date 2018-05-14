import Dep from "./dep";

class Observer {
    constructor(data, vm) {
        this.data = data;
        this.vm = vm;
        this.walk();
    }
    defineReactive(key, val) {
        let dep = new Dep();
        new Proxy(this.vm, {
            get(target, key, receiver) {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(target, key, value, receiver) {
                if (value === val) return;
                val = value;
                dep.notify(); 
            }
        });
    }
    walk() {
        let self = this;
        Object.keys(this.data).forEach(function (key) {
            self.defineReactive(key, self.data[key]);
        });
    }
}

export default Observer;