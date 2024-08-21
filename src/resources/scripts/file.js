// Default File

var file = {
  offsetX: 0,
  offsetY: 0,
  scale: 1.5,
  width: 250,
  height: 250,
  operations: [],
};

// File handling

function importFile() {
  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("style", "display:none");
  input.setAttribute("id", "importPicker");
  document.body.appendChild(input);
  input.click();
  parseFile();
}

function parseFile() {
  var input = document.getElementById("importPicker");
  if (input.files.length == 0) {
    setTimeout(parseFile, 100);
  } else {
    var fileReader = new FileReader();
    fileReader.onload = function (result) {
      document.getElementById("main-textarea").value = result.target.result;
      runText();
      input.remove();
    };
    fileReader.readAsText(input.files[0]);
  }
}

function downloadFile() {
  var text = document.getElementById("main-textarea").value;
  var string = "data:text/text;charset=utf-8," + encodeURIComponent(text);
  var link = document.createElement("a");
  link.setAttribute("href", string);
  link.setAttribute("download", file.name + ".lisp");
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function exportArtboard() {
  var currentScale = file.scale;
  var currentOffsetX = file.offsetX;
  var currentOffsetY = file.offsetY;
  file.offsetX = -file.width / 2;
  file.offsetY = -file.height / 2;
  file.scale = parseFloat(safePrompt("Scale")) * 2.5;
  canvas = document.createElement("canvas");
  context = canvas.getContext("2d");
  context.scale = 2;
  canvas.width = file.width * file.scale * 2;
  canvas.height = file.height * file.scale * 2;
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawLayers(context);

  // Download image
  var string = canvas.toDataURL("image/png");
  var link = document.createElement("a");
  link.setAttribute("href", string);
  link.setAttribute("download", file.name + ".png");
  document.body.appendChild(link);
  link.click();
  link.remove();

  // Reset state
  file.scale = currentScale;
  file.offsetX = currentOffsetX;
  file.offsetY = currentOffsetY;
  canvas = document.getElementById("main-canvas");
  context = canvas.getContext("2d");
  draw();
}
