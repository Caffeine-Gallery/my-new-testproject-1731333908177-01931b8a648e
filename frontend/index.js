import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let currentValue = '';
let operator = '';
let waitingForSecondOperand = false;

window.appendToDisplay = (value) => {
    if (waitingForSecondOperand) {
        display.value = value;
        waitingForSecondOperand = false;
    } else {
        display.value += value;
    }
    currentValue = display.value;
};

window.setOperation = (op) => {
    if (currentValue !== '') {
        operator = op;
        waitingForSecondOperand = true;
    }
};

window.clearDisplay = () => {
    display.value = '';
    currentValue = '';
    operator = '';
    waitingForSecondOperand = false;
};

window.calculate = async () => {
    if (currentValue !== '' && operator !== '') {
        const parts = display.value.split(operator);
        if (parts.length === 2) {
            const operand1 = parseFloat(parts[0]);
            const operand2 = parseFloat(parts[1]);
            
            display.value = 'Calculating...';
            
            try {
                let result;
                switch (operator) {
                    case '+':
                        result = await backend.add(operand1, operand2);
                        break;
                    case '-':
                        result = await backend.subtract(operand1, operand2);
                        break;
                    case '*':
                        result = await backend.multiply(operand1, operand2);
                        break;
                    case '/':
                        result = await backend.divide(operand1, operand2);
                        break;
                }
                display.value = result.toString();
                currentValue = display.value;
                operator = '';
            } catch (error) {
                display.value = 'Error';
                console.error('Calculation error:', error);
            }
        }
    }
};
