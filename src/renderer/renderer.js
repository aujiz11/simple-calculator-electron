document.addEventListener('DOMContentLoaded', () => {
  const resultElement = document.getElementById('result');
  const historyElement = document.getElementById('history');

  const PI = 3.14159265359;
  const e = 2.71828182846;
  
  let currentInput = '0';      // Current number being entered or calculated result
  let previousInput = '';      // First operand stored for calculation
  let operation = null;        // Current operation to perform (+, -, *, /, %)
  let shouldResetScreen = false; // Flag to determine if display should be reset on next input
  let lastOperation = null;

  document.getElementById('minimize-btn').addEventListener('click', () => {
    window.electronAPI.window.minimize();
  });

  document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.window.close();
  });

  function addEventListenersToButtons() {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', () => {
        const value = button.dataset.value;
        
        // Route the button press to appropriate handler based on button type
        if (value >= '0' && value <= '9' || value === '.') {
          // Number or decimal point
          inputNumber(value);
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
          handleOperator(value);
        } else if (value === '=') {
          calculate();
        } else if (value === 'clear') {
          clear();
        } else if (value === 'backspace') {
          backspace();
        }
        
        updateDisplay();
      });
    });
  }

  addEventListenersToButtons();

  document.addEventListener('keydown', (event) => {
    if ((event.key >= '0' && event.key <= '9') || (event.key === '.' && !currentInput.includes('.'))) {
      inputNumber(event.key);
    }
    else if (['+', '-', '*', '/'].includes(event.key)) {
      handleOperator(event.key);
      lastOperation = event.key;
    }
    else if (event.key === 'Enter' || event.key === '=') {
      calculate();
    }
    else if (event.key === 'Escape') {
      clear();
    }
    else if (event.key === 'Backspace') {
      backspace();
    }
    else if (event.key === '%') {
      handleOperator('%');
    }
    
    updateDisplay();
  });

  /**
   * Handle numeric input (0-9 and decimal point)
   * @param {string} number - The digit or decimal point to input
   */
  function inputNumber(number) {
    if (number !== null && number !== undefined) {
      // Replace the initial 0 with the number (unless it's a decimal point)
      if (currentInput === '0' && number !== '.') {
        currentInput = number;
      } 
      else if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
      } 
      else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
      }
    }
  }

  /**
   * Handle operator input (+, -, *, /, %)
   * @param {string} op - The operator
   */
  function handleOperator(op) {
    try {
      if (operation !== null) calculate();
      
      previousInput = currentInput;
      operation = op;
      shouldResetScreen = true;
      
      historyElement.textContent = `${previousInput} ${getOperatorSymbol(operation)}`;
    } catch (e) {
      console.error("Error in handleOperator:", e);
    }
  }

  /**
   * Perform the calculation based on stored operation
   */
  function calculate() {
    // Skip if there's no operation or we're waiting for a second number
    if (operation === null || shouldResetScreen) return;
    
    // Convert string inputs to numbers
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    const operators = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b
    };
    
    // This way of assigning values ​​is better than my original switch-case
    const result = operators[operation] ? operators[operation](prev, current) : null;
    if (result === null || result === undefined) return;

    historyElement.textContent = `${previousInput} ${getOperatorSymbol(operation)} ${currentInput} =`;
    currentInput = formatResult(result);
    operation = null;
  }

  /**
   * Format calculation result to maintain display cleanliness
   * @param {number} number - The calculated result
   * @returns {string} - The formatted number as a string
   */
  function formatResult(number) {
    if (Number.isInteger(number)) {
      return number.toString();
    } else {
      if (number.toString().length > 12) {
        return number.toFixed(8);
      } else {
        return number.toString();
      }
    }
  }

  /**
   * Convert operation symbols to display-friendly characters
   * @param {string} op - The operator symbol
   * @returns {string} - The display-friendly operator symbol
   */
  function getOperatorSymbol(op) {
    const symbolMap = {
      '+': '+',
      '-': '−',
      '*': '×',
      '/': '÷',
      '%': '%'
    };
    
    return symbolMap[op] || op;
  }

  /**
   * Clear all calculator state (C button functionality)
   */
  function clear() {
    lastOperation = null;
    currentInput = '0';
    previousInput = '';
    operation = null;
    historyElement.textContent = '';
  }

  /**
   * Delete the last input character (backspace functionality)
   */
  function backspace() {
    if (currentInput.length > 0) {
      currentInput = currentInput.toString().slice(0, -1);
      if (currentInput === '') {
        currentInput = '0';
      }
    }
  }

  /**
   * Update the calculator display with current input
   */
  function updateDisplay() {
    if (resultElement) {
      resultElement.textContent = currentInput;
    }
  }

  function debugCalculator() {
    console.log({
      currentInput,
      previousInput,
      operation,
      shouldResetScreen
    });
  }
});