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
        Object.keys(this.data).forEach(key => {
            defineReactive(key, this.data[key]);
        });
    }
}

export default Observer;