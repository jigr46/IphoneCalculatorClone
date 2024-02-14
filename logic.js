document.addEventListener('DOMContentLoaded', function () {
    let display = document.getElementById('Screen');
    let buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(function (button) {
        button.addEventListener('click', function () {
            handleButtonClick(button.innerText);
        });
    });

    function handleButtonClick(value) {
        if (isNumber(value)) {
            handleNumberClick(value);
        } else if (isOperator(value)) {
            handleOperatorClick(value);
        } else if (value === '=') {
            handleEqualClick();
        } else if (value === 'AC') {
            handleClearClick();
        } else if (value === '+/-') {
            handlePlusMinusClick();
        } else if (value === '%') {
            handlePercentageClick();
        } else if (value === '.') {
            handleDecimalClick();
        }

        updateDisplay();
    }

    function isNumber(value) {
        return !isNaN(value) || value === '.';
    }

    function isOperator(value) {
        return ['+', '-', '×', '÷'].includes(value);
    }

    function handleNumberClick(value) {
        currentInput += value;
    }

    function handleOperatorClick(value) {
        if (currentInput !== '') {
            if (previousInput !== '') {
                handleEqualClick();
            }
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        }
    }

    function handleEqualClick() {
        if (currentInput !== '' && previousInput !== '') {
            currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
            operator = '';
            previousInput = '';
        }
    }

    function calculate(num1, num2, operator) {
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '×':
                return num1 * num2;
            case '÷':
                return num1 / num2;
            default:
                return num2;
        }
    }

    function handleClearClick() {
        currentInput = '';
        previousInput = '';
        operator = '';
    }

    function handlePlusMinusClick() {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) * -1).toString();
        }
    }

    function handlePercentageClick() {
        if (currentInput !== '') {
            currentInput = (parseFloat(currentInput) / 100).toString();
        }
    }

    function handleDecimalClick() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function updateDisplay() {
        display.innerText = currentInput !== '' ? currentInput : '0';
    }
});
