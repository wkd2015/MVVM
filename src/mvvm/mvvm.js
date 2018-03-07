import Observer from "./observer/observer";
import Compile from "./compile/compile";

function MVVM(options) {
    let data = options.data;
    let el = document.querySelector(options.el);
    new Observer(data, this);
    let dom = new Compile(el, this);
    //nodeToFragment(el, this);
    el.appendChild(dom.nodeToFragment());
}

window.MVVM = MVVM;