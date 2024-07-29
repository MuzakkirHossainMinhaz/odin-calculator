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
  if (operator === "add") {
    return "+";
  } else if (operator === "subtract") {
    return "-";
  } else if (operator === "multiply") {
    return "×";
  } else if (operator === "divide") {
    return "÷";
  } else if (operator === "modulus") {
    return "%";
  } else if (operator === "equals") {
    return "=";
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
  } else if (action === "cancel") {
    if (!operator) {
      firstNumber = firstNumber.slice(0, -1);
    } else {
      secondNumber = secondNumber.slice(0, -1);
    }
  } else if (
    action === "add" ||
    action === "subtract" ||
    action === "multiply" ||
    action === "divide" ||
    action === "modulus"
  ) {
    operator = action;
  } else if (action === "equals") {
    if (firstNumber && operator && secondNumber) {
      // perform calculation based on operator
      switch (operator) {
        case "add":
          firstNumber = (
            parseFloat(firstNumber) + parseFloat(secondNumber)
          ).toString();
          break;
        case "subtract":
          firstNumber = (
            parseFloat(firstNumber) - parseFloat(secondNumber)
          ).toString();
          break;
        case "multiply":
          firstNumber = (
            parseFloat(firstNumber) * parseFloat(secondNumber)
          ).toString();
          break;
        case "divide":
          firstNumber = (
            parseFloat(firstNumber) / parseFloat(secondNumber)
          ).toString();
          break;
        case "modulus":
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
