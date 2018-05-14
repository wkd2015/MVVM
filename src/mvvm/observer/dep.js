class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {//管理器接收通知，并通知每一个订阅者
        this.subs.forEach(sub => {
            sub.update()
        });
    }
}
Dep.target = null;

export default Dep;