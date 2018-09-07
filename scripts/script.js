/* 1) Create an instance of CSInterface. */
const csInterface = new CSInterface();

/* 2) Make a reference to your HTML button and add a click handler. */
const openButton = document.querySelector(".btn");
openButton.addEventListener("click", runJSX);

/* 3) Write a helper function to pass instructions to the ExtendScript side. */
function runJSX() {
  csInterface.evalScript("createOverlays()");
}