// Dep

class Dep {
    constructor() {
        this.subs = new Set();
    }
    addSub(sub) {
        this.subs.add(sub);
    }
    removeSub(sub) {
        this.subs.delete(sub);
    }
    notify() {
        for (let sub of this.subs) {
            sub.update();
        }
    }
}
Dep.target = null;

// Compile

class Compile {
    nodeToFragment(el){
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child != null) {
            fragment.appendChild(child);
        }
        return fragment;
    }
    compileElement(el){
        let me = this;
        let childNodes = el.childNodes;
        [...childNodes].forEach(node => {
            let text = node.textContent;
            let reg = /\{\{((?:.|\n)+?)\}\}/;
            if (node.nodeType === 1) {
                me.compile(node);
            } else if (node.nodeType === 3 && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        })
    }
    compile(node){
        let me = this;
        let nodeAttrs = node.attributes;
        [...nodeAttrs].forEach(attr => {
            let attrName = attr.name;
        })
    }
}