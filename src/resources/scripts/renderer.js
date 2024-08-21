// Main draw function

function draw() {
  // Clear everything
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw
  drawConsole(context);
  drawGrid(context);
  drawLayers(context);
}

// Console
function drawConsole(context) {
  context.fillStyle = "#FFFFFF99";
  context.font = "Normal 14px IBM Plex Mono";
  context.fillText(runtimeConsole, 10, 65);
}

// Grid

function drawGrid(context) {
  var centerX = canvas.width / (pixelRatio * 2);
  var centerY = canvas.height / (pixelRatio * 2);
  var xSize = file.width;
  var ySize = file.height;
  context.fillStyle = "rgba(255,255,255,0.3)";
  for (var x = -xSize; x <= xSize; x += 10) {
    for (var y = -ySize; y <= ySize; y += 10) {
      context.beginPath();
      var radius = 0.6;
      if (x % 20 === 0 && y % 20 === 0) {
        radius = 1;
      }
      context.arc(
        x * file.scale + centerX - file.offsetX * file.scale,
        y * file.scale + centerY - file.offsetY * file.scale,
        radius,
        0,
        2 * Math.PI
      );
      context.fill();
    }
  }
}

// Layers

function drawLayers(context) {
  var centerX = canvas.width / (pixelRatio * 2);
  var centerY = canvas.height / (pixelRatio * 2);

  for (const o in file.operations) {
    var operation = file.operations[o];

    const path = operation.path;
    if (operation.type == "fill") {
      context.fillStyle = operation.color;
    } else if (operation.type == "stroke") {
      context.strokeStyle = operation.color;
      context.lineWidth = operation.width * file.scale;
    }
    if (path.type == "rect") {
      const scaledX =
        centerX - (file.width - path.x + file.offsetX) * file.scale;
      const scaledY =
        centerY - (file.height - path.y + file.offsetY) * file.scale;
      const scaledW = path.w * file.scale;
      const scaledH = path.h * file.scale;
      if (operation.type == "fill") {
        context.fillRect(scaledX, scaledY, scaledW, scaledH);
      } else if (operation.type == "stroke") {
        context.strokeRect(scaledX, scaledY, scaledW, scaledH);
      }
    } else if (path.type == "circle") {
      const scaledX =
        centerX - (file.width - path.x + file.offsetX) * file.scale;
      const scaledY =
        centerY - (file.height - path.y + file.offsetY) * file.scale;
      const scaledR = (path.r * file.scale) / 2;
      context.beginPath();
      context.arc(
        scaledX + scaledR,
        scaledY + scaledR,
        scaledR,
        0,
        2 * Math.PI
      );
      if (operation.type == "fill") {
        context.fill();
      } else if (operation.type == "stroke") {
        context.stroke();
      }
    } else if (path.type == "text") {
      const fontSize = path.s * file.scale;
      const scaledX =
        centerX - (file.width - path.x + file.offsetX) * file.scale;
      const scaledY =
        centerY - (file.height - path.y + file.offsetY) * file.scale;
      context.font = "Bold " + fontSize + "px Inter";
      if (operation.type == "fill") {
        context.fillText(path.t, scaledX, scaledY);
      } else if (operation.type == "stroke") {
        context.strokeText(path.t, scaledX, scaledY);
      }
    }
  }
}
