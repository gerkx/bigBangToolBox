// const xmlParse = require('/story/xml-parse');


// const xmlPath = "E:\\Dropbox (BigBangBoxSL)\\PROYECTOS\\My preschool monster serie\\PRODUCCION\\Story\\EPISODIOS\\Sustos\\video\\SUSTOS_XML\\MM_26_Sustos_Rv1.xml" 
// const animatic = "E:\\Dropbox (BigBangBoxSL)\\PROYECTOS\\My preschool monster serie\\PRODUCCION\\Editorial\\FTG\\___S01\\S01E26_sustos\\Animatic\\MM_126_SUSTOS_C_v3_low.mov"

// xmlInfo = xmlParse(xmlPath, animatic);

// alert("boop");

/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
// const shotSupers = document.querySelector("#shotSupersBtn");
// const exportShots = document.querySelector("#exportShotsBtn");
// const trk = document.querySelector("#trk");
// const prefKey = "dev01";
// let userPrefs = {};
// const savePrefs = document.querySelector("#savePrefs");
// shotSupers.addEventListener("click", executeSupers);
// exportShots.addEventListener("click", executeExport);
// savePrefs.addEventListener("click", updatePrefs);

// const superInputs = {
//   prog: document.querySelector("#super-prog"),
//   season: document.querySelector("#super-season"),
//   epi: document.querySelector("#super-epi"),
//   track: document.querySelector("#super-track"),
// }

// const prefs = {
//   prog: document.querySelector("#pref-prog"),
//   season: document.querySelector("#pref-season"),
//   epi: document.querySelector("#pref-epi"),
//   track: document.querySelector("#pref-track"),
// }

const importStoryBtn = document.querySelector("#import-story");
importStoryBtn.addEventListener("click", getPrefs);



//load prefs
// window.onload = function() {
//   if(window.localStorage[prefKey]){
//     userPrefs = JSON.parse(window.localStorage.getItem(prefKey));
//   }else{
//     const newPrefs = {
//       prog: "",
//       season: "",
//       epi: "",
//       track: "",
//     }
//     window.localStorage.setItem(prefKey, JSON.stringify(newPrefs));
//     userPrefs = newPrefs;
//   }
//   for (var key in prefs) {
//     prefs[key].value = userPrefs[key];
//     prefs[key].placeholder = prefs[key].value;
//     superInputs[key].value = userPrefs[key];
//     superInputs[key].placeholder = superInputs[key].value;
//   }
// }

// function updatePrefs() {
//   for (var key in prefs) {
//     userPrefs[key] = prefs[key].value
//   }
//   window.localStorage.setItem(prefKey, JSON.stringify(userPrefs));
// }

function getPrefs() {
  alert("boop")
  var fnCall = `getPrefs()`;

  csInterface.evalScript(fnCall);
}

// trk.addEventListener("click", trkFn);

// function trkFn() {
//   csInterface.evalScript('getTrk()', rcvInfo);
// }

// function trkFn() {
//   alert(parseInt(12/10)+1)
// }

// function executeExport() {
//   let supers = "{";
//   for(let key in superInputs) {
//     supers += `${key}: "${superInputs[key].value}",`;
//   }
//   supers += "}"


//     var fnCall = `renderSection(${supers})`;

//     csInterface.evalScript(fnCall);
// }

// function executeSupers() {


//   for(let key in superInputs) {
//     supers += `${key}: "${superInputs[key].value}",`;
//   }
//   supers += "}"


//     var fnCall = `createOverlays(${supers})`;
//     csInterface.evalScript(fnCall);

// }

// function multTen(num){
//   return Math.round(num*10);
// }

// function padZero(num, zeros){
//   num = num.toString();
//   while(num.length< zeros){
//     num = "0" + num;
//   }
//   return num
// }

// function rcvInfo(res) {
//   alert(res)
// }