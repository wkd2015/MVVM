import Dep from "../observer/dep";

class Watch {
    constructor(vm, node, name, nodeType){
        Dep.target = this; //关联Dep.target到Watch的this上，并更新this上的属性
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.nodeType = nodeType;
        this.update(); //触发update
        Dep.target = null;
    }
    update() {
        this.get();
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

export default Watch;