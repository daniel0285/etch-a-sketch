const DEFAULT_VALUE = 16;

const resizerLabel = document.getElementById("size-label");
const resizer = document.getElementById("canvas-size");
const colorPicker = document.getElementById("color-picker");
const canvas = document.getElementById("canvas");
const deleteOption = document.getElementById("delete");

console.log(deleteOption.checked);

resizer.addEventListener("input", (event) => changeCanvas(event.target.value));
canvas.addEventListener("mousedown", (event) => startDrawing(event));
canvas.addEventListener("mouseup", (event) => stopDrawing(event));
canvas.addEventListener("click", (event) => fillTile(event));
deleteOption.addEventListener("click", () => console.log(deleteOption.checked));

function fillTile(event) {
  event.target.style.backgroundColor = rainbowColorPen();
}

function startDrawing(event) {
  const tile = document.querySelectorAll(".canvas-tiles");
  event.preventDefault();
  tile.forEach((tile) => tile.addEventListener("mouseover", fillTile));
}

function stopDrawing(event) {
  const tile = document.querySelectorAll(".canvas-tiles");
  event.preventDefault();
  tile.forEach((tile) => tile.removeEventListener("mouseover", fillTile));
}

function eraseTile(event) {
  event.target.style.backgroundColor = "white";
}

function penColor() {
  return colorPicker.value;
}

function rainbowColorPen(event) {
  const rainbowColors = [
    "#FF0000", // Red
    "#FF7F00", // Orange
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#0000FF", // Blue
    "#4B0082", // Indigo
    "#8B00FF", // Violet
  ];
  let randomNumber = Math.floor(Math.random() * 6);
  let randomColor = rainbowColors[randomNumber];
  // event.target.style.backgroundColor = randomColor;
  return randomColor;
}
console.log(rainbowColorPen);

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
}

function changeResizerLabel(sizeValue) {
  resizerLabel.textContent = `Resizer: ${sizeValue} X ${sizeValue}`;
}

function createNewTiles(sizeValue) {
  let totalTiles = sizeValue * sizeValue;
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < totalTiles; i++) {
    const newCanvasTile = document.createElement("div");
    newCanvasTile.classList.add(
      "canvas-tiles",
      `canvas-size-${sizeValue}x${sizeValue}`
    );
    fragment.appendChild(newCanvasTile);
  }
  canvas.appendChild(fragment);
}

// Function invokes

defaultCanvas(DEFAULT_VALUE);
