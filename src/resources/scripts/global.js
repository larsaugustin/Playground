// Global Variables

// Rendering
var canvas = document.getElementById("main-canvas");
var context = canvas.getContext("2d");
var pixelRatio = window.devicePixelRatio;

// Console
var runtimeConsole = "";

// Constants
const tintColor = "#FFCC00";

// Utility functions

// Resize event

window.addEventListener("resize", function () {
  resize();
});

function resize() {
  canvas.width = (window.innerWidth * pixelRatio) / 2;
  canvas.style.width = window.innerWidth + "px" / 2;
  canvas.height = window.innerHeight * pixelRatio;
  canvas.style.height = window.innerHeight + "px";
  context.scale(pixelRatio, pixelRatio);

  draw();
}

// Documentation

function showDocumentation() {
  var parameters =
    "location=no,toolbar=no,menubar=no,width=520,height=420,left=100,top=300";
  window.open(
    "/resources/documentation/index.html",
    "Documentation",
    parameters
  );
}

// Safe(r) prompt wrapper

function safePrompt(question, value) {
  var newValue = window.prompt(question, value);
  if (value == parseInt(value) && parseInt(value) == NaN) {
    return value;
  } else if (newValue == null) {
    return value;
  }
  return newValue;
}
