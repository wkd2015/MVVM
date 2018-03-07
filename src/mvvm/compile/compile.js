import Watch from "../watch/watch";

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

export default Compile;