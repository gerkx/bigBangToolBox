



/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
const shotSupers = document.querySelector("#shotSupersBtn");
const exportShots = document.querySelector("#exportShotsBtn");
const trk = document.querySelector("#trk");
shotSupers.addEventListener("click", executeSupers);
exportShots.addEventListener("click", executeExport);
// trk.addEventListener("click", trkFn);

// function trkFn() {
//   csInterface.evalScript('getTrk()', rcvInfo);
// }

// function trkFn() {
//   alert(parseInt(12/10)+1)
// }

function executeExport() {
  var progNombre = document.querySelector("#progNombre").value || "MPM";
  var tempNum = document.querySelector("#tempNum").value || 1;
  var epiNum = document.querySelector("#epiNum").value;
  var pistaNum = document.querySelector("#pistaNum").value || 4;

  if(!epiNum) {
    alert("Introduzca el número de episodio, por favor");
  }else{
    var obj = `{
      prog: "${progNombre}",
      temp: "${tempNum}",
      epi: "${epiNum}",
      pista: "${pistaNum}",
    }`;

    var fnCall = `renderSection(${obj})`;

    csInterface.evalScript(fnCall);
  }
}

function executeSupers() {

  var progNombre = document.querySelector("#progNombre").value || "MPM";
  var tempNum = document.querySelector("#tempNum").value || 1;
  var epiNum = document.querySelector("#epiNum").value;
  var pistaNum = document.querySelector("#pistaNum").value || 4;



  if(!epiNum) {
    alert("Introduzca el número de episodio, por favor");
  }else{
    var obj = `{
      prog: "${progNombre}",
      temp: "${tempNum}",
      epi: "${epiNum}",
      pista: "${pistaNum}",
    }`;

    var fnCall = `createOverlays(${obj})`;

    csInterface.evalScript(fnCall);
  }



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