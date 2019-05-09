(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
class NavButton {
    constructor(name) {
        this.name = name;
        this.id = `btn_${name}`
        this.createElement = () => {
            let child = document.createElement("div");
            child.id = this.id.toLowerCase();
            child.innerHTML = this.name;
            child.classList.add("nav__btn");
            return child
        }
        this.element = this.createElement();
        this.setState = (state) => {
            inst = document.getElementById(this.id);
            if(state.name && !inst.classList.contains("nav__btn--active")){
                inst.classList.add("nav__btn--active");
            }else{
                inst.classList.remove("nav__btn--active")
            }
        }
    }
}

module.exports = NavButton;




},{}],2:[function(require,module,exports){
function state() {
    const stateObj = {};
    const findActiveKey = () => {
        Object.keys(stateObj).find(key => key === true)
    }
    const setInitState = list => list.reduce( (accum, val, idx) => {
        if(idx == 0) { accum[val] = true }else{ accum[val] = false}
        return accum
    }, {});
    return {
        setState: function(key, value){
            stateObj[key.toLowerCase()] = value
        },
        init: list => {
            list.map( (item, idx) => {
                if(idx == 0) { stateObj[item] = true }else{ stateObj[item] = false}
            });
        },
        getActive: () => {
            return Object.keys(stateObj).find(key => stateObj[key] === true)
        },
        val: stateObj,
    }
}

module.exports = state()

},{}],3:[function(require,module,exports){
// const parseXML = require('../story/xml-parse');
const state = require('../components/state');
const NavButton = require('../components/Nav');


// const csInterface = new CSInterface();

let nav = document.querySelector(".nav");

const btn_list = ["importar", "etiquetar", "exportar"]

// state.init(btn_list);
// console.log(state.val);

btn_list.forEach(btn => {
    let capName = btn[0].toUpperCase() + btn.substr(1);
    let newBtn = new NavButton(capName);
    nav.insertAdjacentElement('beforeend', newBtn.element);
})

nav.addEventListener("click", e => {
    if (!e.target.classList.contains("nav")) {
        let kidList = [...nav.childNodes].map(item => item.id);
        kidList.filter(id => id != e.target.id)
            .forEach(id => {state.setState(id.split("_")[1], false);});
        kidList.filter(id => id == e.target.id)
            .forEach(id => {state.setState(id.split("_")[1], true);});

        
    }
    console.log(state.val)

})

// const xmlFile = document.querySelector("#file");
// xmlFile.addEventListener("change", e => {
//     const file = e.srcElement.files[0];
//     const read = new FileReader();
//     read.onload = () => {
//         const parse = parseXML(read.result)
//         console.log(parse)
//     }
//     read.readAsText(file)
// })
// console.log(xmlInfo)

// const importStoryBtn = document.querySelector("#import-story");
// importStoryBtn.addEventListener("click", getPrefs);

// function getPrefs() {
//   alert("beep boop bop")
//   var fnCall = `getPrefs()`;

  // csInterface.evalScript(fnCall);
// }

},{"../components/Nav":1,"../components/state":2}]},{},[3]);
