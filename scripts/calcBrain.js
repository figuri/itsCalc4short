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
                    checkForAmericasBirthday(currentNumber);
                    // if the number is 1776 function will be called to put the american flag
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
                    operator = value; 
                    // Store the selected operator
                    currentNumber = ""; 
                    // Reset current input
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
        hideAmericasBirthday(); 
        //  removes flag on Clear (C)
    }
    

    function performCalculation(num1, num2, op) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (op) {
            case '+':
                return (num1 + num2).toString();
            case '−': 
            // Ensure subtraction is properly handled
                return (num1 - num2).toString();
            case '×':
                return (num1 * num2).toString();
            case '÷':
                return num2 !== 0 ? (num1 / num2).toString() : "Error";
                 // Handle division by zero
            default:
                return num2.toString();
        }
    }

    function checkForAmericasBirthday (result) {
        if (result === "1776") {
            console.log("Oh say can you see");
             // Debugging output
            showAmericasBirthday();
        } else {
            hideAmericasBirthday();
        }
    }


    function showAmericasBirthday () {
        let img = document.getElementById('specialImage'); 
        // Check if image already exists
        if (!img) {
            img = document.createElement('img'); 
            // Create new img element
            img.id = 'specialImage';
            img.src = "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg";
            img.alt = "American Flag";
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.width = '150px';
            img.style.border = '2px solid black';
            document.body.appendChild(img);
        }
    }
    

    function hideAmericasBirthday () {
        let img = document.getElementById('specialImage');
        if (img) {
            img.remove();
            console.log("flag has been saluted and removed");
             // Debugging output
        }
    }


});
