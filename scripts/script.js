const display = document.getElementById("display");
const displayOperator = document.getElementById("operator");
let firstNumber = "";
let operator = "";
let secondNumber = "";

function updateDisplay() {
  display.textContent = secondNumber ? secondNumber : firstNumber || "0";
}

// get operator symbol
function getOperatorSymbol() {
  if (operator === "+") {
    return "+";
  } else if (operator === "-") {
    return "-";
  } else if (operator === "*") {
    return "×";
  } else if (operator === "/") {
    return "÷";
  } else if (operator === "%") {
    return "%";
  }
}

// update display with operator
function updateDisplayOperator() {
  displayOperator.textContent = getOperatorSymbol() || "";
}

function handleButtonClick(event) {
  const button = event.target;
  const action = button.dataset.action;

  if (action === "clear") {
    firstNumber = "";
    operator = "";
    secondNumber = "";
  } else if (action === "backspace") {
    if (!operator) {
      firstNumber = firstNumber.slice(0, -1);
    } else {
      secondNumber = secondNumber.slice(0, -1);
    }
  } else if (
    action === "+" ||
    action === "-" ||
    action === "*" ||
    action === "/" ||
    action === "%"
  ) {
    operator = action;
  } else if (action === "decimal") {
    if (!operator) {
      // add decimal point if first number doesn't already have one
      if (!firstNumber.includes(".")) {
        firstNumber += ".";
      }
    } else {
      // add decimal point if second number doesn't already have one
      if (!secondNumber.includes(".")) {
        secondNumber += ".";
      }
    }
  } else if (action === "equals") {
    if (firstNumber && operator && secondNumber) {
      // perform calculation based on operator
      switch (operator) {
        case "+":
          firstNumber = (
            parseFloat(firstNumber) + parseFloat(secondNumber)
          ).toString();
          break;
        case "-":
          firstNumber = (
            parseFloat(firstNumber) - parseFloat(secondNumber)
          ).toString();
          break;
        case "*":
          firstNumber = (
            parseFloat(firstNumber) * parseFloat(secondNumber)
          ).toString();
          break;
        case "/":
          firstNumber = (
            parseFloat(firstNumber) / parseFloat(secondNumber)
          ).toString();
          break;
        case "%":
          firstNumber = (
            parseFloat(firstNumber) % parseFloat(secondNumber)
          ).toString();
          break;
      }
      secondNumber = "";

      // clear operator
      operator = "";
    }
  } else {
    // handle digit buttons
    if (!operator) {
      firstNumber += button.textContent;
    } else {
      secondNumber += button.textContent;
    }
  }

  updateDisplay();
  updateDisplayOperator();
}

// add event listeners to buttons
document.querySelectorAll(".calculator__keys button").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

// keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const digit = parseInt(key);
  if (digit >= 0 && digit <= 9) {
    handleButtonClick({
      target: { dataset: { action: "digit" }, textContent: digit },
    });
  } else if (key === "Backspace") {
    handleButtonClick({ target: { dataset: { action: "backspace" } } });
  } else if (key === "Escape" || key === "Delete") {
    handleButtonClick({ target: { dataset: { action: "clear" } } });
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "%"
  ) {
    handleButtonClick({ target: { dataset: { action: key } } });
  } else if (key === ".") {
    handleButtonClick({ target: { dataset: { action: "decimal" } } });
  } else if (key === "=" || key === "Enter") {
    handleButtonClick({ target: { dataset: { action: "equals" } } });
  }
});
