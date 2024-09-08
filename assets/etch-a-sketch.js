const resizer = document.getElementById("canvas-size");
const resizerLabel = document.getElementById("size-label");
const canvas = document.getElementById("canvas");

console.log(resizer.value);

resizer.addEventListener("input", (event) => canvasResizer(event.target.value));

defaultCanvas(16);

function defaultCanvas(defaultValue) {
  createNewTiles(defaultValue);
}

function canvasResizer(sizeValue) {
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
  const totalTiles = sizeValue * sizeValue;
  console.log(totalTiles);
  for (let i = 0; i < totalTiles; i++) {
    const newCanvasTile = document.createElement("div");
    newCanvasTile.classList.add("tiles");
    newCanvasTile.setAttribute("style", `flex: 1 1 calc(100% / ${sizeValue});`);
    canvas.appendChild(newCanvasTile);
  }
}
