/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
const shotSupers = document.querySelector("#shotSupersBtn");
const exportShots = document.querySelector("#exportShotsBtn");
const trk = document.querySelector("#trk");
shotSupers.addEventListener("click", executeSupers);
exportShots.addEventListener("click", executeExport);
trk.addEventListener("click", trkFn);

function trkFn() {
  csInterface.evalScript('getTrk()', rcvInfo);
}

function executeExport() {
  var progNombre = document.querySelector("#progNombre").value || "MPM";
  var tempNum = document.querySelector("#tempNum").value || 1;
  var epiNum = document.querySelector("#epiNum").value;
  var secNum = document.querySelector("#secNum").value || 1;

  if(!epiNum) {
    alert("Introduzca el número de episodio, por favor");
  }else{
    var str = `${progNombre}_S${padZero(tempNum, 2)}E${padZero(epiNum, 2)}_SQ${padZero(secNum * 10, 4)}_SH`;
    var fnCall = `renderSection("${str}")`;
    csInterface.evalScript(fnCall);
  }

}

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function executeSupers() {
  var progNombre = document.querySelector("#progNombre").value || "MPM";
  var tempNum = document.querySelector("#tempNum").value || 1;
  var epiNum = document.querySelector("#epiNum").value;
  var secNum = document.querySelector("#secNum").value || 1;

  if(!epiNum) {
    alert("Introduzca el número de episodio, por favor");
  }else{
    var str = `${progNombre}_S${padZero(tempNum, 2)}E${padZero(epiNum, 2)}_SQ${padZero(secNum * 10, 4)}_SH`;
    var fnCall = `createOverlays("${str}")`;
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