// Default mouse move event

var defaultMouseMove = function (moveEvent) {};

// Mouse move event

document.onmousemove = defaultMouseMove;

// Mouse down event

document.onmousedown = function (mouseEvent) {
  var previousX = 0;
  var previousY = 0;

  if (mouseEvent.clientX > window.innerWidth / 2) {
    return;
  }

  document.onmousemove = function (moveEvent) {
    if (previousX == 0) {
      previousX = moveEvent.clientX;
      previousY = moveEvent.clientY;
    } else {
      file.offsetX -= (moveEvent.clientX - previousX) / file.scale;
      file.offsetY -= (moveEvent.clientY - previousY) / file.scale;
      previousX = moveEvent.clientX;
      previousY = moveEvent.clientY;
      draw();
    }
  };

  // Set end event
  document.onmouseup = function (endEvent) {
    // Reset mouse move
    document.onmousemove = defaultMouseMove;
    document.onmouseup = null;

    draw();
  };
};

// Zoom action

document.onwheel = function (zoomEvent) {
  if (zoomEvent.clientX > window.innerWidth / 2) {
    return;
  }
  file.scale += zoomEvent.deltaY * -0.01;
  if (file.scale < 200 / (canvas.width / (pixelRatio * 0.5))) {
    file.scale = 200 / (canvas.width / (pixelRatio * 0.5));
  }
  draw();
};
