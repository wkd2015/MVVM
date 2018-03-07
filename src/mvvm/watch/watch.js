import Dep from "../observer/dep";

class Watch {
    constructor(vm, node, name, nodeType){
        Dep.target = this;
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.nodeType = nodeType;
        this.update();
        Dep.target = null;
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
        console.log(1111);
        this.value = this.vm[this.name];
    }
}

export default Watch;