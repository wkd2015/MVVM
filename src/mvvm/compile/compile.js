import Watch from "../watch/watch";

class Compile {
    constructor(node, vm) { //传入的vm(MVVM)对象为绑定完毕后的对象，Compile用于初始化元素以及绑定元素的触发事件
        this.node = node;
        this.vm = vm;
    }
    nodeToFragment() {
        let frag = document.createDocumentFragment();
        let child;
        while (child = this.node.firstChild) {
            this.compileElement(child);
            frag.appendChild(child);
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
                    node.addEventListener('input', function (e) { //给包含v-model的input元素添加输入监听事件，输入时将输入值更新到vm(MVVM)上，触发更新事件
                        self.vm[name] = e.target.value; //在修改数据时触发监听的setter事件，通过notify-update更新所有元素
                    });
                    node.value = self.vm[name]; //首次初始化时，更新节点的值，从定义的defineProperty中通过get函数获取值
                    node.removeAttribute('v-model');
                }
            }
            new Watch(this.vm, node, name, 'input'); //建立MVVM实例的Watch实例函数
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