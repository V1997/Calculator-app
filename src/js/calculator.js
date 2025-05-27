// Enhanced Calculator with Advanced Features
class Calculator {
  constructor() {
    this.displayElement = document.getElementById('main-display');
    this.historyElement = document.getElementById('history-display');
    this.errorElement = document.getElementById('error-message');
    this.historyListElement = document.getElementById('history-list');
    
    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.history = JSON.parse(localStorage.getItem('calculator-history') || '[]');
    
    this.maxDigits = 15;
    this.maxHistoryItems = 50;
    
    this.bindEvents();
    this.loadHistory();
    this.initializeTheme();
  }

  bindEvents() {
    // Button event listeners
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', (e) => this.handleButtonClick(e));
    });

    // Keyboard event listeners
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

    // History controls
    document.getElementById('history-toggle').addEventListener('click', () => this.toggleHistory());
    document.getElementById('clear-history-btn').addEventListener('click', () => this.clearHistory());
    document.getElementById('clear-all-btn').addEventListener('click', () => this.clearAll());
    document.getElementById('backspace-btn').addEventListener('click', () => this.backspace());
  }

  handleButtonClick(e) {
    const { target } = e;
    const value = target.getAttribute('value');
    
    if (target.matches('.operator')) {
      this.handleOperator(value);
    } else if (target.matches('.decimal')) {
      this.inputDecimal();
    } else if (target.matches('.function')) {
      this.handleFunction(value);
    } else if (target.classList.contains('clear')) {
      this.clear();
    } else if (value) {
      this.inputNumber(value);
    }
    
    target.blur(); // Remove focus after click
  }

  handleKeydown(e) {
    e.preventDefault();
    
    const key = e.key;
    
    if (/[0-9]/.test(key)) {
      this.inputNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      this.handleOperator(key);
    } else if (key === '=' || key === 'Enter') {
      this.handleOperator('=');
    } else if (key === '.') {
      this.inputDecimal();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      this.clear();
    } else if (key === 'Backspace') {
      this.backspace();
    } else if (key === '%') {
      this.handleFunction('percent');
    }
  }

  inputNumber(number) {
    if (this.waitingForOperand) {
      this.currentValue = number;
      this.waitingForOperand = false;
    } else {
      if (this.currentValue.length >= this.maxDigits) {
        this.showError('Maximum digits reached');
        return;
      }
      this.currentValue = this.currentValue === '0' ? number : this.currentValue + number;
    }
    
    this.updateDisplay();
  }

  inputDecimal() {
    if (this.waitingForOperand) {
      this.currentValue = '0.';
      this.waitingForOperand = false;
    } else if (this.currentValue.indexOf('.') === -1) {
      this.currentValue += '.';
    }
    
    this.updateDisplay();
  }

  handleOperator(operator) {
    const current = parseFloat(this.currentValue);

    if (this.previousValue === null) {
      this.previousValue = current;
    } else if (this.operator) {
      const previous = this.previousValue;
      const result = this.calculate(previous, current, this.operator);

      if (result === null) return; // Error occurred

      this.addToHistory(`${this.formatNumber(previous)} ${this.getOperatorSymbol(this.operator)} ${this.formatNumber(current)}`, result);
      
      this.currentValue = String(result);
      this.previousValue = result;
    }

    this.waitingForOperand = true;
    this.operator = operator === '=' ? null : operator;
    this.updateDisplay();
  }

  handleFunction(func) {
    const current = parseFloat(this.currentValue);
    let result;

    switch (func) {
      case 'sqrt':
        if (current < 0) {
          this.showError('Cannot calculate square root of negative number');
          return;
        }
        result = Math.sqrt(current);
        this.addToHistory(`√${this.formatNumber(current)}`, result);
        break;
        
      case 'percent':
        result = current / 100;
        this.addToHistory(`${this.formatNumber(current)}%`, result);
        break;
        
      case 'plusminus':
        result = -current;
        this.addToHistory(`±${this.formatNumber(current)}`, result);
        break;
        
      default:
        return;
    }

    this.currentValue = String(result);
    this.waitingForOperand = true;
    this.updateDisplay();
  }

  calculate(first, second, operator) {
    let result;

    switch (operator) {
      case '+':
        result = first + second;
        break;
      case '-':
        result = first - second;
        break;
      case '*':
        result = first * second;
        break;
      case '/':
        if (second === 0) {
          this.showError('Cannot divide by zero');
          this.shakeCalculator();
          return null;
        }
        result = first / second;
        break;
      default:
        return second;
    }

    // Check for overflow
    if (!isFinite(result)) {
      this.showError('Number too large');
      return null;
    }

    // Round to prevent floating point errors
    result = parseFloat(result.toPrecision(12));
    
    return result;
  }

  formatNumber(num) {
    if (num === null || num === undefined) return '0';
    
    const str = String(num);
    if (str.length > this.maxDigits) {
      // Use scientific notation for very large numbers
      return parseFloat(num).toExponential(6);
    }
    
    // Add commas for large numbers
    return num.toLocaleString('en-US', { maximumFractionDigits: 10 });
  }

  getOperatorSymbol(operator) {
    const symbols = { '+': '+', '-': '-', '*': '×', '/': '÷' };
    return symbols[operator] || operator;
  }

  updateDisplay() {
    this.displayElement.textContent = this.formatNumber(parseFloat(this.currentValue));
    
    if (this.previousValue !== null && this.operator) {
      this.historyElement.textContent = 
        `${this.formatNumber(this.previousValue)} ${this.getOperatorSymbol(this.operator)}`;
    } else {
      this.historyElement.textContent = '';
    }
  }

  clear() {
    this.currentValue = '0';
    this.updateDisplay();
    this.hideError();
  }

  clearAll() {
    this.currentValue = '0';
    this.previousValue = null;
    this.operator = null;
    this.waitingForOperand = false;
    this.updateDisplay();
    this.hideError();
  }

  backspace() {
    if (this.waitingForOperand) return;
    
    if (this.currentValue.length > 1) {
      this.currentValue = this.currentValue.slice(0, -1);
    } else {
      this.currentValue = '0';
    }
    
    this.updateDisplay();
  }

  addToHistory(calculation, result) {
    const historyItem = {
      calculation,
      result: this.formatNumber(result),
      timestamp: new Date().toLocaleTimeString()
    };

    this.history.unshift(historyItem);
    
    // Limit history size
    if (this.history.length > this.maxHistoryItems) {
      this.history = this.history.slice(0, this.maxHistoryItems);
    }

    this.saveHistory();
    this.renderHistory();
  }

  loadHistory() {
    this.renderHistory();
  }

  renderHistory() {
    this.historyListElement.innerHTML = '';
    
    this.history.forEach((item, index) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="calculation">${item.calculation}</div>
        <div class="result">= ${item.result}</div>
      `;
      
      historyItem.addEventListener('click', () => {
        this.currentValue = String(parseFloat(item.result.replace(/,/g, '')));
        this.waitingForOperand = false;
        this.updateDisplay();
        this.toggleHistory(); // Close history panel
      });
      
      this.historyListElement.appendChild(historyItem);
    });
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.renderHistory();
  }

  saveHistory() {
    localStorage.setItem('calculator-history', JSON.stringify(this.history));
  }

  toggleHistory() {
    const historyPanel = document.getElementById('history-panel');
    historyPanel.classList.toggle('show');
  }

  showError(message) {
    this.errorElement.textContent = message;
    this.errorElement.classList.add('show');
    setTimeout(() => this.hideError(), 3000);
  }

  hideError() {
    this.errorElement.classList.remove('show');
  }

  shakeCalculator() {
    const calculator = document.querySelector('.calculator');
    calculator.classList.add('shake');
    setTimeout(() => calculator.classList.remove('shake'), 500);
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('calculator-theme') || 'light';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calculator-theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// Service Worker Registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(registrationError => console.log('SW registration failed'));
  });
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Export for testing (CommonJS)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Calculator };
}

// Export for ES modules
if (typeof window === 'undefined') {
  // Node.js environment
  global.Calculator = Calculator;
}
