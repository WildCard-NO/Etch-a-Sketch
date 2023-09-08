const sizeValue = document.getElementById('sizeValue')
const sizeSlider = document.getElementById('sizeSlider')


document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('grid-container');

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
        
        cell.addEventListener('mouseover', function() {
            cell.style.backgroundColor = 'orange';
        });



        gridContainer.appendChild(cell);
    }
});
