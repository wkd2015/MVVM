function observer(data, vm) {
    Object.keys(data).forEach(function (key) {
        defineReactive(vm, key, data[key]);
    })
}

function defineReactive(vm, key, val) {
    var dep = new Dep();
    Object.defineProperty(vm, key, {
        get() {
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            dep.notify();
        }
    });
}

function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        this.subs.forEach(function (sub) {
            sub.update()
        });
    }
}

function simpleMVVM(options) {
    let data = options.data;
    let el = document.querySelector(options.el);
    observer(data, this);
    let dom = nodeToFragment(el, this);
    el.appendChild(dom);
}

function nodeToFragment(node, vm) {
    let frag = document.createDocumentFragment();
    let child;
    while (child = node.firstChild) {
        compile(child, vm);
        console.log(1);
        frag.append(child);
    }
    return frag;
}

function compile(node, vm) {
    const reg = /\{\{(.*)\}\}/;
    if (node.nodeType === 1) {
        let attrs = node.attributes;
        for (let i = 0; i < attrs.length; i++) {
            if (attrs[i].nodeName == 'v-model') {
                var name = attrs[i].nodeValue
                node.addEventListener('input', function (e) {
                    vm[name] = e.target.value;
                });
                node.value = vm[name];
                node.removeAttribute('v-model');
            }
        }
        new watch(vm, node, name, 'input');
    }
    if (node.nodeType === 3) {
        if (reg.test(node.nodeValue)) {
            let name = RegExp.$1.trim();
            new watch(vm, node, name, 'text');
        }
    }
}

function watch(vm, node, name, nodeType) {
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}
watch.prototype = {
    update() {
        this.get();
        if (this.nodeType == 'input') {
            this.node.value = this.value;
        }
        if (this.nodeType == 'text') {
            this.node.nodeValue = this.value;
        }
    },
    get() {
        this.value = this.vm[this.name];
    }
}