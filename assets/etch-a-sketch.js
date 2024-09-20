const DEFAULT_VALUE = 16;

// DOM elements
const resizerLabel = document.getElementById("size-label");
const resizer = document.getElementById("canvas-size");
const colorPicker = document.getElementById("color-picker");
const body = document.body;
const drawingOption = document.getElementById("drawing-option");
const isDrawPen = document.getElementById("draw");
const isDeletePen = document.getElementById("delete");
const isRainbowPen = document.getElementById("rainbow");
const toggleGrid = document.getElementById("toggle-grid");
const clear = document.getElementById("clear");

// const etchMenu = document.getElementById("etch-menu-container");

// Event listeners

resizer.addEventListener("input", (event) => changeCanvas(event.target.value));
body.addEventListener("mousedown", (event) => startDrawing(event));
body.addEventListener("mouseup", (event) => stopDrawing(event));
body.addEventListener("mousedown", drawHandler);
drawingOption.addEventListener("click", (event) => colorOptionHandler(event));
toggleGrid.addEventListener("click", addGridLine);
clear.addEventListener("click", () => {
  const tile = document.querySelectorAll(".canvas-tile");
  tile.forEach((tile) => (tile.style.backgroundColor = erasePen()));
});

// Mouse behaviors functions

function fillTile(event) {
  if (isDrawPen.checked === true) {
    event.target.style.backgroundColor = normalPen();
  } else if (isDeletePen.checked === true) {
    event.target.style.backgroundColor = erasePen();
  } else if (isRainbowPen.checked === true) {
    let rainbowColor = rainbowColorPen();
    event.target.style.backgroundColor = rainbowColor;
    colorPicker.setAttribute("value", `${rainbowColor}`);
  }
}

function drawHandler(event) {
  if (event.target.classList.contains("canvas-tile")) {
    fillTile(event);
  }
}

function startDrawing() {
  body.addEventListener("mouseover", drawHandler);
  console.log("start drawing");
}

function stopDrawing() {
  body.removeEventListener("mouseover", drawHandler);
  console.log("stop drawing");
}

// Pen options

function normalPen() {
  return colorPicker.value;
}

function erasePen() {
  let eraseColor = "#eeeeee";
  return eraseColor;
}

function rainbowColorPen() {
  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ];
  let randomNumber = Math.floor(Math.random() * rainbowColors.length);
  let randomColor = rainbowColors[randomNumber];
  return randomColor;
}

function colorOptionHandler(event) {
  isDrawPen.checked = false;
  isDeletePen.checked = false;
  isRainbowPen.checked = false;

  if (event.target.id === "draw") {
    isDrawPen.checked = true;
  } else if (event.target.id === "delete") {
    isDeletePen.checked = true;
  } else if (event.target.id === "rainbow") {
    isRainbowPen.checked = true;
  } else {
    console.log("Invalid choice");
    return;
  }
}

// Canvas & Tiles functions

function defaultCanvas(defaultValue) {
  changeResizerLabel(defaultValue);
  createNewTiles(defaultValue);
}

function changeCanvas(sizeValue) {
  changeResizerLabel(sizeValue);
  clearCanvas();
  createNewTiles(sizeValue);
}

function clearCanvas() {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
  // canvas.innerHTML = "";
}

function changeResizerLabel(sizeValue) {
  resizerLabel.textContent = `Size: ${sizeValue} X ${sizeValue}`;
}

function createNewTiles(sizeValue) {
  let totalTiles = sizeValue * sizeValue;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalTiles; i++) {
    const newCanvasTile = document.createElement("div");
    newCanvasTile.classList.add(
      "canvas-tile",
      `canvas-size-${sizeValue}x${sizeValue}`
    );
    fragment.appendChild(newCanvasTile);
  }
  canvas.appendChild(fragment);
  addGridLine();
}

function addGridLine() {
  const tile = document.querySelectorAll(".canvas-tile");
  if (toggleGrid.checked === true) {
    tile.forEach((tile) => tile.classList.add("grid-line"));
  } else {
    tile.forEach((tile) => tile.classList.remove("grid-line"));
  }
}

// Function invokes

defaultCanvas(DEFAULT_VALUE);
