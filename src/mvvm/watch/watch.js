import Dep from "../observer/dep";

class Watch {//每一个属性绑定一个订阅者，通过Dep保存并批量管理
    constructor(vm, node, name, nodeType){
        Dep.target = this; //关联Dep.target到Watch的this上，并更新this上的属性
        this.name = name;
        this.node = node;
        this.vm = vm;
        this.nodeType = nodeType;
        this.update(); //触发update
        Dep.target = null;
    }
    update() {//每一个独立的订阅者根据接收到的数据和自身的情况更新数据
        this.get();//获取更新后vm上的数据
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