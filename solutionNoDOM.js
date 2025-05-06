// Number of items and max weight for the knapsack
const numItems = 14;       // => n
const maxWeight = 20;

// Harmony Search Parameters
const memorySize = 10;     // => HMS
const maxNoImprovement = 100; // => NI
const HMCR = 0.9;         // Harmony Memory Considering Rate (adjusted value)
const PAR = 0.1;          // Pitch Adjustment Rate (adjusted value)

// Generate random items - O(n)
function randomItem() {
  return {
    weight: Math.floor(Math.random() * 9) + 1,
    value: Math.floor(Math.random() * 41) + 10,
  };
}
let items = Array.from({ length: numItems }, randomItem); // O(n)

// Generate a random binary solution - O(n)
function generateRandomHarmony() {
  return items.map(() => Math.random() > 0.5 ? 1 : 0); // O(n)
}

// Evaluate a harmony - O(n)
function evaluateHarmony(harmony) {
  let totalValue = 0;
  let totalWeight = 0;
  harmony.forEach((bit, idx) => { // O(n)
    if (bit === 1) {
      totalValue += items[idx].value;
      totalWeight += items[idx].weight;
    }
  });
  return { totalValue, totalWeight };
}

// Apply pitch adjustment - O(n)
function applyPitchAdjustment(harmony) {
  const index = Math.floor(Math.random() * harmony.length); // O(1)
  harmony[index] = 1 - harmony[index]; // O(1)
  const { totalWeight } = evaluateHarmony(harmony); // O(n)
  return totalWeight <= maxWeight ? harmony : null;
}

// Check if harmony exists in memory - O(HMS * n)
function isHarmonyInMemory(harmony, memory) {
  return memory.some(mem => mem.every((val, idx) => val === harmony[idx])); // O(HMS * n)
}

// Generate unique valid harmony - O(HMS * n * R), R: retries
function generateUniqueRandomHarmony(memory) {
  let harmony;
  do {
    harmony = generateRandomHarmony(); // O(n)
  } while (
    evaluateHarmony(harmony).totalWeight > maxWeight || // O(n)
    isHarmonyInMemory(harmony, memory)                  // O(HMS * n)
  );
  return harmony;
}

// Select harmony with optional adjustment - O(n + HMS * n)
function selectHarmonyFromMemory(memory) {
  if (Math.random() < HMCR) {
    let harmony = [...memory[Math.floor(Math.random() * memory.length)]]; // O(n)
    if (Math.random() < PAR) {
      let adjusted = applyPitchAdjustment([...harmony]); // O(n)
      harmony = adjusted || generateUniqueRandomHarmony(memory); // O(HMS * n * R)
    }
    return harmony;
  } else {
    return generateUniqueRandomHarmony(memory); // O(HMS * n * R)
  }
}

// Harmony Search algorithm
function harmonySearch() {
  let memory = [];
  let bestHarmony = null;
  let bestValue = -Infinity;
  let noImprovement = 0;

  // --- Initialization phase ---
  // O(HMS * HMS * n)
  while (memory.length < memorySize) {
    memory.push(generateUniqueRandomHarmony(memory)); // O(HMS * n * R)
  }

  // --- Main loop (at most T iterations) ---
  // Each iteration: O(HMS * n)
  while (noImprovement < maxNoImprovement) { // ≤ NI iterations
    const newHarmony = selectHarmonyFromMemory(memory); // O(HMS * n * R)

    const { totalValue: newValue, totalWeight: newWeight } = evaluateHarmony(newHarmony); // O(n)
    if (newWeight > maxWeight) continue; // O(1)

    // Find worst harmony in memory - O(HMS * n)
    let worstIndex = 0;
    let worstValue = Infinity;
    memory.forEach((harmony, i) => {
      const { totalValue } = evaluateHarmony(harmony); // O(n)
      if (totalValue < worstValue) {
        worstValue = totalValue;
        worstIndex = i;
      }
    });

    // Replace if better and unique - O(HMS * n)
    if (newValue > worstValue && !isHarmonyInMemory(newHarmony, memory)) {
      memory[worstIndex] = newHarmony; // O(n)
      noImprovement = 0;
    } else {
      noImprovement++;
    }
  }

  // Final best selection - O(HMS * n)
  for (const harmony of memory) {
    const { totalValue } = evaluateHarmony(harmony); // O(n)
    if (totalValue > bestValue) {
      bestValue = totalValue;
      bestHarmony = harmony;
    }
  }

  return {
    bestHarmony,
    ...evaluateHarmony(bestHarmony), // O(n)
    items
  };
}

// Example usage
const result = harmonySearch();
console.log(result);
