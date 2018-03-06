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