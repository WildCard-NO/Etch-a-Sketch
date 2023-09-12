function createGrid() {



    const colorPicker = document.getElementById('colorPicker');
    const toggleBorders = document.getElementById('toggleBorders');
    const gridContainer = document.getElementById('gridContainer');
    const sizeValue = document.getElementById('sizeValue');
    const sizeSlider = document.getElementById('sizeSlider');


    // Define grid size here
    const gridSize = 16; // Change this value for different grid sizes
    const cellSize = 50; // This is the pixel size of each cell


    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;
    gridContainer.style.width = `${gridSize * cellSize}px`;
    gridContainer.style.height = `${gridSize * cellSize}px`;



    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        gridContainer.appendChild(cell);
    }
}

toggleBorders.addEventListener('click', function() {
    if (gridContainer.classList.contains('withBorders')) {
        gridContainer.classList.remove('withBorders');
    } else {
        gridContainer.classList.add('withBorders');
    }
});

function updateCellBackgroundColor(color)   {
    document.documentElement.style.setProperty('--selected-color', color);
}

colorPicker.addEventListener('change', function(event) {
    const selectedColor = event.target.value;
    updateCellBackgroundColor(selectedColor);
});

createGrid();