document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display'); // Ensure correct display selection
    const buttons = document.querySelectorAll(".btn");
    
    let currentNumber = '';
    let previousNumber = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();

            if (!isNaN(value) || value === '.') {
                // If it's a number or a decimal point
                if (value === '.' && currentNumber.includes('.')) return;
                currentNumber += value;
                updateDisplay(currentNumber);

            } else if (value === "C") {
                // Reset calculator
                resetCalculator();

            } else if (value === "←") {
                // Backspace: Remove last digit
                currentNumber = currentNumber.slice(0, -1);
                updateDisplay(currentNumber || "0");

            } else if (value === "=") {
                // Perform calculation if there are valid inputs
                if (currentNumber && previousNumber && operator) {
                    currentNumber = performCalculation(previousNumber, currentNumber, operator);
                    updateDisplay(currentNumber);
                    previousNumber = "";
                    operator = "";
                }
            } else {
                // If an operator (+, -, ×, ÷) is clicked
                if (currentNumber) {
                    if (previousNumber) {
                        // If there’s already a previous number, perform the calculation
                        previousNumber = performCalculation(previousNumber, currentNumber, operator);
                    } else {
                        previousNumber = currentNumber;
                    }
                    operator = value; // Store the selected operator
                    currentNumber = ""; // Reset current input
                    updateDisplay(previousNumber);
                }
            }
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

        switch (op) {
            case '+':
                return (num1 + num2).toString();
            case '−': // Ensure subtraction is properly handled
                return (num1 - num2).toString();
            case '×':
                return (num1 * num2).toString();
            case '÷':
                return num2 !== 0 ? (num1 / num2).toString() : "Error"; // Handle division by zero
            default:
                return num2.toString();
        }
    }
});
