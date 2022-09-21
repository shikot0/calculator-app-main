class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)  
    }
    appendNumber(number) { 
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();  
    }
    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation; 
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-': 
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break; 
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''; 
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand); 
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }else {
            this.previousOperandTextElement.innerText = '';  
        }
    }
}
 

const numberBtns = document.querySelectorAll('[data-number]'); 
const operationBtns = document.querySelectorAll('[data-operation]')
const calculatorDisplay = document.getElementById('calculator-display'); 
const deleteBtn = document.getElementById('delete-button'); 
const resetBtn = document.getElementById('reset-button');
const equateBtn = document.getElementById('equate-button'); 
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');
const main = document.querySelector('main'); 
const themeSwitcher = document.getElementById('theme-grid'); 

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);


numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equateBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay(); 
})
resetBtn.addEventListener('click', () => {
    calculator.clear();  
    calculator.updateDisplay();     
})

themeSwitcher.addEventListener('click', e => {
    if(e.target.id == 'theme-1') { 
        main.classList.remove('second-theme');
        main.classList.remove('third-theme');
        main.classList.add('first-theme')
    } else if(e.target.id == 'theme-2') {
        main.classList.remove('first-theme');
        main.classList.remove('third-theme');
        main.classList.add('second-theme');
    } else if(e.target.id == 'theme-3') {
        main.classList.remove('first-theme');
        main.classList.remove('second-theme'); 
        main.classList.add('third-theme');
    }
})