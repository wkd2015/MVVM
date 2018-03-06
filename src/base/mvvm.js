
class Compile {
    constructor(node, vm) {
        this.node = node;
        this.vm = vm;
    }
    nodeToFragment() {
        let frag = document.createDocumentFragment();
        let child;
        while (child = this.node.firstChild) {
            this.compileElement(child);
            frag.append(child);
        }
        return frag;
    }
    compileElement(node) {
        const reg = /\{\{(.*)\}\}/;
        let self = this;
        if (node.nodeType === 1) {
            let attrs = node.attributes;
            for (let i = 0; i < attrs.length; i++) {
                if (attrs[i].nodeName == 'v-model') {
                    var name = attrs[i].nodeValue
                    console.log(name);
                    node.addEventListener('input', function (e) {
                        self.vm[name] = e.target.value;
                    });
                    node.value = self.vm[name];
                    node.removeAttribute('v-model');
                }
            }
            new Watch(this.vm, node, name, 'input');
        }
        if (node.nodeType === 3) {
            if (reg.test(node.nodeValue)) {
                let name = RegExp.$1.trim();
                new Watch(this.vm, node, name, 'text');
            }
        }
    }
}

class Watch {
    constructor(vm, node, name, nodeType){
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.nodeType = nodeType;
        this.update();
    }
    update() {
        this.get();
        console.log(this.vm)
        if (this.nodeType == 'input') {
            this.node.value = this.value;
        }
        if (this.nodeType == 'text') {
            this.node.nodeValue = this.value;
        }
    }
    get() {
        this.value = this.vm[this.name];
    }
}

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

class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        });
    }
}
Dep.target = null;

function MVVM(options) {
    let data = options.data;
    let el = document.querySelector(options.el);
    new Observer(data, this);
    let dom = new Compile(el, this);
    //nodeToFragment(el, this);
    el.appendChild(dom.nodeToFragment());
}