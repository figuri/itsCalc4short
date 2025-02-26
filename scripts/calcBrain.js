document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('display');
    const buttons = document.querySelectorAll(".btn");
    let currentNumber = '';
    let previousNumber = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();

            if (!isNaN(value) || value === '.') {
                 // if its a number or a dot
                 if (value === '.' && currentNumber.includes('.')) return;
                currentNumber += value;
            updateDisplay(currentNumber);

            } else if (value === "C") {
                resetCalculator();

            } else if (value === "&&larr") {
                currentNumber = currentNumber.slice(0, -1);
                updateDisplay(currentNumber);
                updateDisplay(currentNumber || "0"); 
                // show 0 if there is no number

            } else if (value === "=") {
                // calculate the result
                if (currentNumber && previousNumber && operator) {
                    currentNumber = performCalculation(previousNumber, currentNumber, operator);
                    updateDisplay(currentNumber);
                    previousNumber = "";
                    operator = "";
                }
            } else {
                if (currentNumber) {
                    if (previousNumber) {
                        // if there is a previous number, calculate the result
                        previousNumber = performCalculation(previousNumber, currentNumber, operator);
                    }
                } else {
                    previousNumber = currentNumber;
                }
                operator = value;
                currentNumber = "";
                updateDisplay(previousNumber);
            } 
               
        });
    });
});

function updateDisplay(value) {
    display.textContent = value;
}

function resetCalculator() {
    currentNumber = '';
    previousNumber = '';
    operator = '';
    updateDisplay('0');
}

function performCalculation(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    