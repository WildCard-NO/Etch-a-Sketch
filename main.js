    // grabbing references to various elements from the DOM
    const colorPicker = document.getElementById('colorPicker'); // Color input to pick the paining color
    const toggleBorders = document.getElementById('toggleBorders'); // button to toggle cell borders
    const gridContainer = document.getElementById('gridContainer'); // Container where the grid cells will be placed
    const sizeValue = document.getElementById('sizeValue'); // Display element for size value
    const sizeSlider = document.getElementById('sizeSlider'); // Slider input for grid size

    function createGrid(gridSize) {
        //Clear previous grid
        gridContainer.innerHTML = '';
    


    // Define grid size here
    const cellSize = 50; // This Defines the size for each pixel
    
    // Setting the grid's CSS properties to format it properly based on gridSize and cellSize
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`; // Set columns for the grid
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`; // Set rows for the grid
    gridContainer.style.width = `${gridSize * cellSize}px`; // Total width of the grid
    gridContainer.style.height = `${gridSize * cellSize}px`; // Total height of the grid


    // Create and setup each individual cell in the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div'); // Create a new div element
        cell.classList.add('cell'); // Add the 'cell' class to style it

        // Add an event listener so that when you hover over the cell, it gets painted
        cell.addEventListener('mouseover', function() {
            cell.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--selected-color').trim();
    });
    gridContainer.appendChild(cell); // Add the cell to the grid container
    }
}

sizeSlider.addEventListener('input', function() { // Use 'input' to reflect changes immediately
    // Update display grid size
    sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;

    // Refresh the grid based on the slider value
    createGrid(sizeSlider.value);
})

// Event listener for the 'Toggle Borders' button
toggleBorders.addEventListener('click', function() {
    // If the grid currently has borders, remove them. Otherwise, add them.
    if (gridContainer.classList.contains('withBorders')) {
        gridContainer.classList.remove('withBorders');
    } else {
        gridContainer.classList.add('withBorders');
    }
});

// Function to update the selected color in he root CSS properties
function updateCellBackgroundColor(color)   {
    document.documentElement.style.setProperty('--selected-color', color);
}

// Event listener for the color picker input
// When the color is changed, update the selected color
colorPicker.addEventListener('change', function(event) {
    const selectedColor = event.target.value;
    updateCellBackgroundColor(selectedColor);
    console.log(selectedColor);
});

// Create the grid when the script runs
createGrid(sizeSlider.value);