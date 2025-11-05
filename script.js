const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const calculator = document.getElementById("calculator");
const toggleBtn = document.querySelector(".toggle");

let input = "";
let isMaximized = false;

// --- Evaluate expression safely ---
function calculate(expression) {
  try {
    const sanitized = expression
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/＋/g, "+")
      .replace(/÷/g, "/")
      .replace(/％/g, "%");
    return eval(sanitized);
  } catch {
    return "Error";
  }
}

// --- Button logic ---
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // skip the toggle button (⛶ / ☰)
    if (button.classList.contains("toggle")) return;

    const value = button.textContent.trim();

    if (value === "AC") {
      input = "";
      display.textContent = "0";
    } else if (value === "C") {
      input = input.slice(0, -1);
      display.textContent = input || "0";
    } else if (value === "＝") {
      const result = calculate(input);
      display.textContent = result;
      input = result.toString();
    } else {
      input += value;
      display.textContent = input;
    }

    // keep display scrolled to bottom when overflowing
    display.scrollTop = display.scrollHeight;
  });
});

// --- Toggle maximize / minimize ---
toggleBtn.addEventListener("click", () => {
  isMaximized = !isMaximized;
  calculator.classList.toggle("maximized", isMaximized);
  document.body.classList.toggle("maximized-view", isMaximized);

  if (isMaximized) {
    const calcHeight = calculator.offsetHeight;
    const screenHeight = window.innerHeight;
    const scale = Math.min((screenHeight * 0.92) / calcHeight, 1.8);
    calculator.style.setProperty("--zoom-scale", scale);
  } else {
    calculator.style.setProperty("--zoom-scale", 1);
  }
});


