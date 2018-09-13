/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
const openButton = document.querySelector(".btn");
openButton.addEventListener("click", runJSX);



/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function runJSX() {
  var progNombre = document.querySelector("#progNombre").value || "MPM";
  var tempNum = document.querySelector("#tempNum").value || 1;
  var epiNum = document.querySelector("#epiNum").value;
  var secNum = document.querySelector("#secNum").value || 1;

  if(!epiNum) alert("Introduzca el número de episodio, por favor");

  var str = `${progNombre}_S${padZero(tempNum, 2)}E${padZero(epiNum, 2)}_SQ${padZero(secNum * 10, 4)}_SH_`;

  // alert(str);

  var fnCall = `createOverlays("${str}")`;
  csInterface.evalScript(fnCall);
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