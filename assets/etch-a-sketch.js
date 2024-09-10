const resizerLabel = document.getElementById("size-label");
const resizer = document.getElementById("canvas-size");
const colorPicker = document.getElementById("color-picker");
const canvas = document.getElementById("canvas");
const canvasTiles = document.querySelectorAll(".canvas-tiles");
const deleteOption = document.getElementById("delete");

console.log(deleteOption);

resizer.addEventListener("input", (event) => changeCanvas(event.target.value));
canvas.addEventListener("mousedown", (event) => startDrawing(event));
canvas.addEventListener("mouseup", (event) => stopDrawing(event));
canvas.addEventListener("click", (event) => eraser(event));
deleteOption.addEventListener("click", () => console.log(deleteOption.checked));

function fillTile(event) {
  event.target.style.backgroundColor = penColor();
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

function defaultCanvas(defaultValue) {
  changeResizerLabel(defaultValue);
  createNewTiles(defaultValue);
}

defaultCanvas(16);

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
  for (let i = 0; i < sizeValue * sizeValue; i++) {
    const newCanvasTile = document.createElement("div");
    newCanvasTile.classList.add("canvas-tiles");
    newCanvasTile.setAttribute("style", `flex: 1 1 calc(100% / ${sizeValue});`);
    canvas.appendChild(newCanvasTile);
  }
}
