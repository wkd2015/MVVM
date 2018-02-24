function observe(data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        for (let prop in data) {
            defineReactive(data, prop, data[prop]);
        }
    }
}

function defineReactive(obj, key, val) {
    const dep = new Dep();
    Reflect.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            observe(newVal);
            dep.notify();
        }
    });
    observe(val);
}