const DEFAULT_CANVAS_SIZE = 16;

// DOM elements
const canvasSizeInput = document.getElementById("canvas-size");
const documentBody = document.body;
const drawingOptionSelector = document.getElementById("drawing-option");
const toggleGridCheckbox = document.getElementById("toggle-grid");
const clearCanvasButton = document.getElementById("clear");

// Event listeners

canvasSizeInput.addEventListener("input", (event) =>
  handleCanvasResize(event.target.value)
);
documentBody.addEventListener("mousedown", (event) =>
  onMouseDownStartDrawing(event)
);
documentBody.addEventListener("mouseup", (event) =>
  onMouseUpStopDrawing(event)
);
documentBody.addEventListener("mousedown", handleDrawing);
drawingOptionSelector.addEventListener("click", (event) =>
  handlePenOptionChange(event)
);
toggleGridCheckbox.addEventListener("click", toggleGridLines);
clearCanvasButton.addEventListener("click", resetTileColors);

// Mouse behaviors functions

function fillTile(event) {
  const drawPen = document.getElementById("draw");
  const deletePen = document.getElementById("delete");
  const rainbowPen = document.getElementById("rainbow");
  const colorPicker = document.getElementById("color-picker");

  if (drawPen.checked === true) {
    event.target.style.backgroundColor = getSelectedColor();
  } else if (deletePen.checked === true) {
    event.target.style.backgroundColor = getEraseColor();
  } else if (rainbowPen.checked === true) {
    const rainbowColor = getRandomRainbowColor();
    event.target.style.backgroundColor = rainbowColor;
    colorPicker.setAttribute("value", `${rainbowColor}`);
  }
}

function handleDrawing(event) {
  if (event.target.classList.contains("canvas-tile")) {
    fillTile(event);
  }
}

function onMouseDownStartDrawing() {
  documentBody.addEventListener("mouseover", handleDrawing);
}

function onMouseUpStopDrawing() {
  documentBody.removeEventListener("mouseover", handleDrawing);
}

// Pen options

function getSelectedColor() {
  const colorPicker = document.getElementById("color-picker");
  return colorPicker.value;
}

function getEraseColor() {
  const eraseColor = "#eeeeee";
  return eraseColor;
}

function getRandomRainbowColor() {
  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ];
  const randomIndex = Math.floor(Math.random() * rainbowColors.length);
  return rainbowColors[randomIndex];
}

function handlePenOptionChange(event) {
  const drawPen = document.getElementById("draw");
  const deletePen = document.getElementById("delete");
  const rainbowPen = document.getElementById("rainbow");
  drawPen.checked = false;
  deletePen.checked = false;
  rainbowPen.checked = false;

  if (event.target.id === "draw") {
    drawPen.checked = true;
  } else if (event.target.id === "delete") {
    deletePen.checked = true;
  } else if (event.target.id === "rainbow") {
    rainbowPen.checked = true;
  }
}

// Canvas & Tiles functions

function initializeCanvas(defaultValue) {
  updateCanvasSizeLabel(defaultValue);
  generateCanvasTiles(defaultValue);
}

function handleCanvasResize(sizeValue) {
  updateCanvasSizeLabel(sizeValue);
  resetCanvasTiles();
  generateCanvasTiles(sizeValue);
}

function resetCanvasTiles() {
  canvas.innerHTML = "";
}

function resetTileColors() {
  const canvastiles = document.querySelectorAll(".canvas-tile");
  canvastiles.forEach((tile) => (tile.style.backgroundColor = getEraseColor()));
}

function updateCanvasSizeLabel(sizeValue) {
  const resizerLabel = document.getElementById("size-label");
  resizerLabel.textContent = `Size: ${sizeValue} x ${sizeValue}`;
}

function generateCanvasTiles(sizeValue) {
  const totalTiles = sizeValue * sizeValue;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalTiles; i++) {
    const newCanvasTile = document.createElement("div");
    newCanvasTile.classList.add("canvas-tile");
    newCanvasTile.setAttribute("style", `flex: 1 1 calc(100% / ${sizeValue});`);
    fragment.appendChild(newCanvasTile);
  }
  canvas.appendChild(fragment);
  toggleGridLines();
}

function toggleGridLines() {
  const tiles = document.querySelectorAll(".canvas-tile");
  if (toggleGridCheckbox.checked === true) {
    tiles.forEach((tile) => tile.classList.add("grid-line"));
  } else {
    tiles.forEach((tile) => tile.classList.remove("grid-line"));
  }
}

// Function invocation

initializeCanvas(DEFAULT_CANVAS_SIZE);
