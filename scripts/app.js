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
