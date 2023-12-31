    // grabbing references to various elements from the DOM
    const colorPicker = document.getElementById('colorPicker'); // Color input to pick the paining color
    const colorInput =  document.getElementById('colorInput');
    const recentColorsDiv = document.getElementById('recentColors');
    const darkeningButton = document.getElementById('darkening');
    const MAX_RECENT_COLORS = 5;
    const randomizeButton = document.getElementById('randomize');
    const toggleBorders = document.getElementById('toggleBorders'); // button to toggle cell borders
    const gridContainer = document.getElementById('gridContainer'); // Container where the grid cells will be placed
    const sizeValue = document.getElementById('sizeValue'); // Display element for size value
    const sizeSlider = document.getElementById('sizeSlider'); // Slider input for grid size
    const eraseButton = document.getElementById('eraseButton'); // Erasing color
    const clearButton = document.getElementById('clear');





    let isMouseDown = false;
    let isRandomColorMode = false;
    let recentColors = [];
    let isDarkeningMode = false;
    let isErasingMode = false;


    document.addEventListener('mousedown', function(e) {
        if (e.button === 0) { // Left mouse button
            isMouseDown = true;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isMouseDown = false;
    });
    


    function darkenColor(color, percent) {
        let [r,g,b] = color.match(/\d+/g).map(Number);
        r = Math.floor(r *(1-percent / 100));
        g = Math.floor(g *(1-percent / 100));
        b = Math.floor(b *(1-percent / 100));
        return `rgb(${r},${g},${b})`;
    }


    gridContainer.addEventListener('mousedown', function(e) {
        // Check if the left button is pressed
        if (e.button === 0) {
            isMouseDown = true;
        }
    });

    gridContainer.addEventListener('mouseup', function() {
        isMouseDown = false;
    });

    gridContainer.addEventListener('mouseleave', function() {
        isMouseDown = false;
    });

    gridContainer.addEventListener('mouseenter', function(e) {
        if (e.buttons === 1) { // checks if left mouse button is pressed while entering
            isMouseDown = true;
        }
    });


    function createGrid(gridSize) {
        //Clear previous grid
        gridContainer.innerHTML = '';
    


    // Define grid size here
    const cellSize = gridContainer.offsetWidth / gridSize; // This Defines the size for each pixel

    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize} 1fr)`;


    // Create and setup each individual cell in the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div'); // Create a new div element
        cell.classList.add('cell'); // Add the 'cell' class to style it

        // Add an event listener so that when you hover over the cell, it gets painted
        function paintCell() {
            if (isErasingMode) {
                cell.style.backgroundColor = '';
            }
            else if (isRandomColorMode) {
                cell.style.backgroundColor = getRandomColor();
            } else if (isDarkeningMode) {
                let currentColor = getComputedStyle(cell).backgroundColor;
                cell.style.backgroundColor = darkenColor(currentColor, 10);
            } else {
                cell.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--selected-color').trim();
            }
        }

        cell.addEventListener('mouseover', function() {
            if (isMouseDown) { 
                paintCell();
            }
        });

        cell.addEventListener('mousedown', function(e) {
            if (e.button == 0) {
                paintCell();
            }
        })
        gridContainer.appendChild(cell); // Add the cell to the grid container
    }
}



function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}


colorInput.addEventListener('change', function(event) {
    const colorName = event.target.value.trim().toLowerCase();

    // Check if its a valid color
    const isValidColor = (function(color) {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    })(colorName);


    if (isValidColor) {
        updateCellBackgroundColor(colorName);

        // If the color exist in the array, remove it
        const colorIndex = recentColors.indexOf(colorName);
        if (colorIndex !==-1) {
            recentColors.splice(colorIndex, 1);
        }

        // Add the color to the beginning of the recent colors array
        recentColors.unshift(colorName);

        // If we have more than the max recent colors, remove the last one
        if (recentColors.length > MAX_RECENT_COLORS) {
            recentColors.pop();
        }

        // Update recent color display
        updateRecentColorsDisplay();
    } else {
        alert('Invalid color name.');
    }
});

function updateRecentColorsDisplay() {
    recentColorsDiv.innerHTML = '';

    recentColors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.innerText = color;
        colorDiv.addEventListener('click', function() {
            colorInput.value = color;
            updateCellBackgroundColor(color);
        });
        recentColorsDiv.appendChild(colorDiv);
    });
}

function updateCellBackgroundColor(color)  {
    document.documentElement.style.setProperty('--selected-color', color);
}

colorPicker.addEventListener('change', function(event) {
    isRandomColorMode = false;
    const selectedColor = event.target.value;
    updateCellBackgroundColor(selectedColor);
});

randomizeButton.addEventListener('click', function() {
    isDarkeningMode = false;
    isRandomColorMode = true;
    randomizeButton.disabled = true;
    colorPicker.addEventListener('input', function() {
        isRandomColorMode = false;
        randomizeButton.disabled = false;
    });
});

darkeningButton.addEventListener('click', function() {
    isRandomColorMode = false; //turn off Random color mode
    isDarkeningMode = !isDarkeningMode; //Toggle darkening mode on/off

    if (isDarkeningMode) {
        darkeningButton.style.backgroundColor = "#aaa";
    } else {
        darkeningButton.style.backgroundColor = "";
    }
})


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


eraseButton.addEventListener('click', function() {
    isErasingMode = !isErasingMode // Toggle eraseing mode on/off

    if (isErasingMode) {
        eraseButton.style.backgroundColor = '#aaa'; // Change the button color to show erasing mode is on or off
    } else {
        eraseButton.style.backgroundColor = ''; // Reset the button color
    }
});

clearButton.addEventListener('click', function() {

    const cells = gridContainer.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor ='';
    });
});


// Create the grid when the script runs
createGrid(sizeSlider.value);