// Number of items
const numItems = 14;
const maxWeight = 20;

// Parameters
const memorySize = 5;
const maxNoImprovement = 300;

// Items array
let items = [];
let memory = [];

function randomItem() {
  return {
    weight: Math.floor(Math.random() * 9) + 1,   // weight: 1 to 9
    value: Math.floor(Math.random() * 41) + 10,  // value: 10 to 50
  };
}

function generateRandomItems() {
  items = [];
  for (let i = 0; i < numItems; i++) {
    items.push(randomItem());
  }
}

function generateRandomHarmony() {
  return items.map(() => Math.random() > 0.5 ? 1 : 0);
}

function evaluateHarmony(harmony) {
  let totalValue = 0;
  let totalWeight = 0;
  harmony.forEach((bit, idx) => {
    if (bit === 1) {
      totalValue += items[idx].value;
      totalWeight += items[idx].weight;
    }
  });
  return { totalValue, totalWeight };
}

function renderItems() {
  const itemsList = document.getElementById('items-list');
  itemsList.innerHTML = '';

  items.forEach(item => {
    const itemBox = document.createElement('div');
    itemBox.className = 'item-box';
    itemBox.innerHTML = `
        <div>${item.value}</div>
        <div>${item.weight}</div>
    `;
    itemsList.appendChild(itemBox);
  });
}

generateRandomItems();
renderItems();

document.addEventListener('DOMContentLoaded', () => {
    const maxCapacityElement = document.getElementById('max-capacity');
    if (maxCapacityElement) {
      maxCapacityElement.textContent = maxWeight;
    }
});
  

function renderMemory() {
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = ''; // Clear previous memory list
  
    // Sort memory by total value (best harmony first)
    memory.sort((a, b) => {
      const aValue = evaluateHarmony(a).totalValue;
      const bValue = evaluateHarmony(b).totalValue;
      return bValue - aValue; // Descending order: highest value first
    });
  
    // Render the sorted harmonies
    memory.forEach(harmony => {
      const harmonyRow = document.createElement('div');
      harmonyRow.style.display = 'flex';
      harmonyRow.style.marginBottom = '0.5rem';
  
      harmony.forEach((bit, idx) => {
        if (bit === 1) {
          const itemBox = document.createElement('div');
          itemBox.className = 'item-box';
          itemBox.innerHTML = `
            <div>${items[idx].value}</div>
            <div>${items[idx].weight}</div>
          `;
          harmonyRow.appendChild(itemBox);
        }
      });
  
      memoryList.appendChild(harmonyRow);
    });
  }
  

function renderHarmony(harmony, highlight = null) {
  const harmonyList = document.getElementById('harmony-list');
  harmonyList.innerHTML = '';

  const harmonyRow = document.createElement('div');
  harmonyRow.style.display = 'flex';

  harmony.forEach((bit, idx) => {
    if (bit === 1) {
      const itemBox = document.createElement('div');
      itemBox.className = 'item-box';
      itemBox.innerHTML = `
        <div>${items[idx].value}</div>
        <div>${items[idx].weight}</div>
      `;
      if (highlight) {
        itemBox.style.border = `2px solid ${highlight}`;
      }
      harmonyRow.appendChild(itemBox);
    }
  });

  harmonyList.appendChild(harmonyRow);
}

function renderKnapsack(harmony) {
  const knapsackBox = document.getElementById('knapsack-box');
  knapsackBox.innerHTML = '';

  let totalWeight = 0;
  let totalValue = 0;

  harmony.forEach((bit, idx) => {
    if (bit === 1) {
      const itemBox = document.createElement('div');
      itemBox.className = 'item-box';
      itemBox.innerHTML = `
        <div>${items[idx].value}</div>
        <div>${items[idx].weight}</div>
      `;
      knapsackBox.appendChild(itemBox);

      totalWeight += items[idx].weight;
      totalValue += items[idx].value;
    }
  });

  document.getElementById('total-value').innerText = totalValue;
  document.getElementById('total-weight').innerText = totalWeight;
}

function generateUniqueRandomHarmony() {
    let newHarmony;
    do {
      newHarmony = generateRandomHarmony(); // Generate a random harmony
    } while (evaluateHarmony(newHarmony).totalWeight > maxWeight || isHarmonyInMemory(newHarmony)); // Check if valid and not in memory
    return newHarmony;
}
  
// Get the slider element and the display value
const speedSlider = document.getElementById('speed-slider');
const speedValueDisplay = document.getElementById('speed-value');

// Function to update the displayed speed value
function updateSpeedValue() {
  const speedValue = speedSlider.value;
  speedValueDisplay.textContent = `${speedValue} ms`; // Display the slider value
}

// Update speed value when the slider is changed
speedSlider.addEventListener('input', updateSpeedValue);

function startHarmonySearch() {
    // Initialize memory with unique random harmonies
    memory = [];
    for (let i = 0; i < memorySize; i++) {
      let newHarmony = generateUniqueRandomHarmony();
      memory.push(newHarmony);
    }
  
    renderMemory();
  
    let noImprovement = 0;
    let bestValue = -Infinity;
    let bestHarmony = null;
  
    // Store the reference to the interval
    let searchInterval;
  
    // Function to start the interval based on current slider value
    function startInterval() {
      const iterationSpeed = parseInt(speedSlider.value, 10); // Get the current speed from the slider
  
      searchInterval = setInterval(() => {
        const newHarmony = generateUniqueRandomHarmony(); // Ensure it's unique
        const { totalValue: newValue, totalWeight: newWeight } = evaluateHarmony(newHarmony);
  
        // Immediately ignore invalid harmonies
        if (newWeight > maxWeight) {
          renderHarmony(newHarmony, 'red');
          return;
        }
  
        renderHarmony(newHarmony);
  
        // Find the worst harmony
        let worstIdx = -1;
        let worstValue = Infinity;
  
        memory.forEach((harmony, idx) => {
          const { totalValue } = evaluateHarmony(harmony);
          if (totalValue < worstValue) {
            worstValue = totalValue;
            worstIdx = idx;
          }
        });
  
        if (newValue > worstValue) {
          // Highlight new harmony in green
          renderHarmony(newHarmony, 'green');
  
          setTimeout(() => {
            memory[worstIdx] = newHarmony;
            renderMemory(); // Re-render the memory after the new harmony is added
          }, 300); // green glow for 300ms
  
          noImprovement = 0; // reset the counter when improvement is found
        } else {
          noImprovement++;
        }
  
        // Stop if no improvement for a long time
        if (noImprovement >= maxNoImprovement) {
          clearInterval(searchInterval);
  
          // Find best solution in memory
          memory.forEach(harmony => {
            const { totalValue } = evaluateHarmony(harmony);
            if (totalValue > bestValue) {
              bestValue = totalValue;
              bestHarmony = harmony;
            }
          });
  
          // Render the best solution
          if (bestHarmony) {
            renderKnapsack(bestHarmony);
          }
        }
      }, iterationSpeed);
    }
  
    // Start the first interval based on the current slider value
    startInterval();
  
    // Listen for slider changes and adjust the interval speed dynamically
    speedSlider.addEventListener('input', () => {
      const iterationSpeed = parseInt(speedSlider.value, 10); // Get the updated speed from the slider
      clearInterval(searchInterval); // Stop the current interval
      startInterval(); // Restart the interval with the new speed
      updateSpeedValue(); // Update the displayed speed
    });
  
    updateSpeedValue(); // Update the displayed speed value when the function starts
}
  
  
  
  // Helper function to check if harmony is already in memory
function isHarmonyInMemory(harmony) {
    return memory.some(existingHarmony => {
      return existingHarmony.every((bit, idx) => bit === harmony[idx]);
    });
}

document.getElementById('play-button').addEventListener('click', () => {
  startHarmonySearch();
});
