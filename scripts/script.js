const parseXML = require('../story/xml-parse')
// import xmlParse from '../story/xml-parse'

// const csInterface = new CSInterface();

const xmlFile = document.querySelector("#file");
xmlFile.addEventListener("change", e => {
    const file = e.srcElement.files[0];
    const read = new FileReader();
    read.onload = () => {
        const parse = parseXML(read.result)
        console.log(parse)
    }
    read.readAsText(file)
})
// console.log(xmlInfo)

// const importStoryBtn = document.querySelector("#import-story");
// importStoryBtn.addEventListener("click", getPrefs);

// function getPrefs() {
//   alert("beep boop bop")
//   var fnCall = `getPrefs()`;

  // csInterface.evalScript(fnCall);
// }
