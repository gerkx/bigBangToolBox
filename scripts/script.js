



/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
const shotSupers = document.querySelector("#shotSupersBtn");
const exportShots = document.querySelector("#exportShotsBtn");
const trk = document.querySelector("#trk");
const prefKey = "dev01";
let userPrefs = {};
const savePrefs = document.querySelector("#savePrefs");
shotSupers.addEventListener("click", executeSupers);
exportShots.addEventListener("click", executeExport);
savePrefs.addEventListener("click", updatePrefs);

const superInputs = {
  prog: document.querySelector("#super-prog"),
  season: document.querySelector("#super-season"),
  epi: document.querySelector("#super-epi"),
  track: document.querySelector("#super-track"),
}

const prefs = {
  prog: document.querySelector("#pref-prog"),
  season: document.querySelector("#pref-season"),
  epi: document.querySelector("#pref-epi"),
  track: document.querySelector("#pref-track"),
}



//load prefs
window.onload = function() {
  if(window.localStorage[prefKey]){
    userPrefs = JSON.parse(window.localStorage.getItem(prefKey));
  }else{
    const newPrefs = {
      prog: "",
      season: "",
      epi: "",
      track: "",
    }
    window.localStorage.setItem(prefKey, JSON.stringify(newPrefs));
    userPrefs = newPrefs;
  }
  for (var key in prefs) {
    prefs[key].value = userPrefs[key];
    prefs[key].placeholder = prefs[key].value;
    superInputs[key].value = userPrefs[key];
    superInputs[key].placeholder = superInputs[key].value;
  }
}

function updatePrefs() {
  for (var key in prefs) {
    userPrefs[key] = prefs[key].value
  }
  window.localStorage.setItem(prefKey, JSON.stringify(userPrefs));
}

// trk.addEventListener("click", trkFn);

// function trkFn() {
//   csInterface.evalScript('getTrk()', rcvInfo);
// }

// function trkFn() {
//   alert(parseInt(12/10)+1)
// }

function executeExport() {
  let supers = "{";
  for(let key in superInputs) {
    supers += `${key}: "${superInputs[key].value}",`;
  }
  supers += "}"
  // var progNombre = document.querySelector("#progNombre").value || "MPM";
  // var tempNum = document.querySelector("#tempNum").value || 1;
  // var epiNum = document.querySelector("#epiNum").value;
  // var pistaNum = document.querySelector("#pistaNum").value || 4;

  // if(!epiNum) {
  //   alert("Introduzca el número de episodio, por favor");
  // }else{
  //   var obj = `{
  //     prog: "${progNombre}",
  //     temp: "${tempNum}",
  //     epi: "${epiNum}",
  //     pista: "${pistaNum}",
  //   }`;

    var fnCall = `renderSection(${supers})`;

    csInterface.evalScript(fnCall);
  // }
}

function executeSupers() {

  // var progNombre = document.querySelector("#progNombre").value || "MPM";
  // var tempNum = document.querySelector("#tempNum").value || 1;
  // var epiNum = document.querySelector("#epiNum").value;
  // var pistaNum = document.querySelector("#pistaNum").value || 4;
  let supers = "{";
  for(let key in superInputs) {
    supers += `${key}: "${superInputs[key].value}",`;
  }
  supers += "}"


  // if(!epiNum) {
  //   alert("Introduzca el número de episodio, por favor");
  // }else{
  //   var obj = `{
  //     prog: "${progNombre}",
  //     temp: "${tempNum}",
  //     epi: "${epiNum}",
  //     pista: "${pistaNum}",
  //   }`;

    var fnCall = `createOverlays(${supers})`;
    // alert(fnCall)
    csInterface.evalScript(fnCall);
  // }



}

function multTen(num){
  return Math.round(num*10);
}

function padZero(num, zeros){
  num = num.toString();
  while(num.length< zeros){
    num = "0" + num;
  }
  return num
}

function rcvInfo(res) {
  alert(res)
}