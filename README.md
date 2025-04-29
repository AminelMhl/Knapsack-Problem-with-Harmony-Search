
# 🎵 Knapsack Problem with Harmony Search  
_A Visual + Interactive Algorithm Simulation_

---

## 🔍 Overview  
This project demonstrates how the **Harmony Search Algorithm** can solve the **0/1 Knapsack Problem**, implemented entirely in **JavaScript, HTML, and CSS**. It offers a **visual, interactive UI** inspired by a Figma design.

Users can **observe harmony creation, evolution, and memory management** — all while tuning parameters and viewing real-time visual feedback.

---

## 🧠 Key Features  

- 🎲 **Randomized item generation** (different each run)
- 🎶 **Harmony Search algorithm** applied to the knapsack problem
- 🧰 **Dynamic harmony memory** with visual updates
- ❌ Invalid harmonies (over capacity) highlighted in **red**
- ✅ New optimal harmonies glow **green** before memory update
- 🎒 Final best harmony rendered into the **knapsack** once search is complete
- ⚙️ Real-time **parameter adjustment**
- ▶️ Controlled via a **Play button** (not automatic on page load)

---

## 🧮 How It Works  

1. Click **Play** to begin.
2. Items are **randomly generated** with varying weights and values.
3. Initial harmony memory is constructed randomly.
4. In each iteration:
   - A **new harmony** is constructed probabilistically.
   - If it's valid (within capacity), it's compared with the worst in memory.
   - If it's better, it **replaces** the worst.
   - Harmonies over capacity are ignored (but shown in red).
5. The process stops if **no improvement is found after a certain number of iterations**.
6. Final optimal harmony is displayed in the **knapsack box**, with total weight/value.

---

## ⚙️ Adjustable Parameters  

Accessible via sliders in the UI:

- **Harmony Memory Size** (Default: 7)
- **Harmony Memory Consideration Rate (HMCR)** (Default: 0.8)
- **Pitch Adjusting Rate (PAR)** (Default: 0.3)

---

## 🛠 Tech Stack  

- **Frontend**: HTML5 + CSS3 (Vanilla)  
- **Logic**: JavaScript ES6+  
- **Design**: Figma (for layout planning)  
- **No libraries/frameworks used**

---

## 🖼 UI Overview  

| Section        | Description                            |
|----------------|----------------------------------------|
| 📦 Items       | Random items generated at each run     |
| 🧠 Memory      | Shows current harmonies in memory      |
| 🎶 Harmony     | New harmonies generated each iteration |
| 🎒 Knapsack    | Final solution visualized here         |
| ⚙️ Parameters  | User-configurable algorithm variables  |
| ▶️ Play Button | Starts the process manually             |

---

## 🧾 Usage  

1. **Clone the repo**:
   ```
   git clone https://github.com/AminelMhl/Knapsack-Problem-with-Harmony-Search
   cd Knapsack-Problem-with-Harmony-Search
   ```

2. **Open `index.html` in a browser**:
   - No installation needed — works locally.

---

## 📁 File Structure

```
.
├── index.html        # Main layout
├── style.css         # Styling and layout rules
├── script.js         # Algorithm logic and rendering
└── assets/           # Favicon
```

---

## ✍️ Author  

**Mohamed Amine Soltana**  
🔗 GitHub: [@AminelMhl](https://github.com/AminelMhl)

---

## 📜 License  

This project is under the **MIT License** — free to use, adapt, and share.
