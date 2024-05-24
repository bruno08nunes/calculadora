// DOM Elements
const numbersButtons = document.querySelectorAll(".number");
const output = document.querySelector(".output");
const clearButton = document.querySelector("#clear");
const arithmeticOperatorButtons = document.querySelectorAll(
    ".arithmetic-operator"
);
const equalButton = document.querySelector("#equal");
const dotButton = document.querySelector("#dot");

// Variables
let numberShowed1 = "0";
let numberShowed2 = null;
let operation = null;

// Functions
const clearCalculator = () => {
    numberShowed1 = "0";
    numberShowed2 = null;
    operation = null;
};

const calculate = () => {
    const number1 = Number(numberShowed1);
    const number2 = Number(numberShowed2);
    let result = 0;

    switch (operation) {
        case "+":
            clearCalculator();
            result = number1 + number2;
            break;
        case "-":
            clearCalculator();
            result = number1 - number2;
            break;
        case "×":
            clearCalculator();
            result = number1 * number2;
            break;
        case "÷":
            clearCalculator();
            result = number1 / number2;
            break;
        default:
            clearCalculator();
            numberShowed1 = "0"
            output.textContent = "Error";
            break;
    }

    if (isNaN(result)) {
        numberShowed1 = "0";
        output.textContent = "Error";
        return;
    }

    numberShowed1 = result.toString();
    output.textContent = numberShowed1;
};

const addFirstNumber = (value) => {
    // Add ther first number (before operator)
    const isInfinity = numberShowed1 === "Infinity" && operation === null;
    if (isInfinity) {
        numberShowed1 = "0";
    }

    const isFirstResult =
        numberShowed1 === "0" &&
        numberShowed2 === null &&
        operation === null &&
        value !== ".";
    if (isFirstResult) {
        numberShowed1 = value;
        output.textContent = numberShowed1;
        return;
    }

    const isDotInvalid = numberShowed1.includes(".") && value === "." && numberShowed2 === null;
    if (isDotInvalid) {
        return;
    }

    numberShowed1 += value;
    output.textContent = numberShowed1;
    return;
}

const addSecondNumber = (value) => {
    // Add the second number (after operator)
    const isFirstCharacterSecondNumber = numberShowed2 === null && operation !== null && value !== ".";
    if (isFirstCharacterSecondNumber) {
        numberShowed2 = value;
        output.textContent += numberShowed2;
        return;
    }

    const isDotInvalid2 = numberShowed2.includes(".") && value === ".";
    if (isDotInvalid2) {
        return;
    }
    
    numberShowed2 += value;
    output.textContent += numberShowed2[numberShowed2.length - 1];
    return;
}

const addOperator = (value) => {
    if (isNaN(numberShowed1)) {
        numberShowed1 = "0";
        output.textContent = numberShowed1;
        return;
    }

    const isFirstNumber = numberShowed1 === "0" && numberShowed2 === null;
    if (isFirstNumber && value === "-") {
        numberShowed1 = "-";
        output.textContent = numberShowed1;
        return;
    }

    if (isNaN(numberShowed2)) {
        return;
    }

    const isSecondNumber = numberShowed2 === null && operation !== null;
    if (isSecondNumber && value === "-") {
        numberShowed2 = "-";
        output.textContent += numberShowed2;
        return;
    }

    const twoOperatorsInARow = numberShowed2 === null && operation !== null && isNaN(output.textContent[output.textContent.length - 1]);
    if (twoOperatorsInARow) {
        return;
    }

    if (operation !== null) {
        calculate();
    }

    operation = value;
    output.textContent += operation;
}

// Events
numbersButtons.forEach((numberButton) => {
    numberButton.addEventListener("click", (e) => {
        const value = e.target.textContent;
        
        // First value (before operator)
        const isFirstNumber = numberShowed1 && numberShowed2 === null && operation === null;
        if (isFirstNumber) {
            addFirstNumber(value);
            return;
        }
        
        // Second value (after operator)
        addSecondNumber(value);
    });
});

clearButton.addEventListener("click", () => {
    clearCalculator();
    output.textContent = numberShowed1;
});

arithmeticOperatorButtons.forEach((arithmeticOperatorButton) => {
    arithmeticOperatorButton.addEventListener("click", (e) => {
        const value = e.target.textContent;

        addOperator(value);
    });
});

equalButton.addEventListener("click", calculate);