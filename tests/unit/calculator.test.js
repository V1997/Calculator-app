/**
 * Unit tests for Calculator class
 * Tests core calculation functionality and error handling
 */

const { Calculator } = require('../../src/js/calculator.js');

describe('Calculator', () => {
  let calculator;
  beforeEach(() => {
    // Setup complete DOM structure that Calculator expects
    document.body.innerHTML = `
      <main class="app">
        <!-- Theme Toggle -->
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
          <span class="theme-icon">🌙</span>
        </button>
        
        <!-- Calculator -->
        <section class="calculator" role="application" aria-label="Calculator">
          <!-- Display -->
          <div class="calculator-display">
            <div class="display-history" id="history-display" aria-live="polite"></div>
            <h1 id="main-display" aria-live="assertive">0</h1>
            <div class="error-message" id="error-message" aria-live="assertive"></div>
          </div>
          
          <!-- Scientific Functions Row -->
          <div class="scientific-buttons">
            <button class="function" value="sqrt" aria-label="Square root">√</button>
            <button class="function" value="percent" aria-label="Percent">%</button>
            <button class="function" value="plusminus" aria-label="Plus minus">±</button>
            <button class="clear-all" id="clear-all-btn" aria-label="Clear all">AC</button>
          </div>
          
          <!-- Main Button Grid -->
          <div class="calculator-buttons">
            <button class="operator" value="/" aria-label="Divide">÷</button>
            <button class="operator" value="*" aria-label="Multiply">×</button>
            <button class="operator" value="-" aria-label="Subtract">-</button>
            <button class="operator" value="+" aria-label="Add">+</button>
            
            <button value="7" aria-label="Seven">7</button>
            <button value="8" aria-label="Eight">8</button>
            <button value="9" aria-label="Nine">9</button>
            <button class="clear" id="clear-btn" aria-label="Clear">C</button>
            
            <button value="4" aria-label="Four">4</button>
            <button value="5" aria-label="Five">5</button>
            <button value="6" aria-label="Six">6</button>
            <button class="backspace" id="backspace-btn" aria-label="Backspace">⌫</button>
            
            <button value="1" aria-label="One">1</button>
            <button value="2" aria-label="Two">2</button>
            <button value="3" aria-label="Three">3</button>
            <button class="equal-sign operator" value="=" aria-label="Equals">=</button>
            
            <button value="0" class="zero" aria-label="Zero">0</button>
            <button class="decimal" value="." aria-label="Decimal point">.</button>
          </div>
          
          <!-- History Panel -->
          <div class="history-panel" id="history-panel">
            <div class="history-header">
              <h3>History</h3>
              <button class="clear-history" id="clear-history-btn" aria-label="Clear history">Clear</button>
            </div>
            <div class="history-list" id="history-list"></div>
          </div>
        </section>
        
        <!-- Toggle History Button -->
        <button class="history-toggle" id="history-toggle" aria-label="Toggle history">
          <span>📋</span>
        </button>
      </main>
    `;

    calculator = new Calculator();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Operations', () => {
    test('should add two numbers correctly', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('+');
      calculator.appendNumber('3');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe(8);
    });

    test('should subtract two numbers correctly', () => {
      calculator.appendNumber('10');
      calculator.chooseOperation('-');
      calculator.appendNumber('4');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe(6);
    });

    test('should multiply two numbers correctly', () => {
      calculator.appendNumber('6');
      calculator.chooseOperation('×');
      calculator.appendNumber('7');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe(42);
    });

    test('should divide two numbers correctly', () => {
      calculator.appendNumber('15');
      calculator.chooseOperation('÷');
      calculator.appendNumber('3');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe(5);
    });
  });

  describe('Error Handling', () => {
    test('should handle division by zero', () => {
      calculator.appendNumber('5');
      calculator.chooseOperation('÷');
      calculator.appendNumber('0');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe('Error');
    });

    test('should handle invalid operations', () => {
      calculator.currentOperand = 'invalid';
      calculator.chooseOperation('+');
      calculator.appendNumber('5');
      calculator.compute();
      
      expect(calculator.currentOperand).toBe('Error');
    });
  });

  describe('Number Input', () => {
    test('should append numbers correctly', () => {
      calculator.appendNumber('1');
      calculator.appendNumber('2');
      calculator.appendNumber('3');
      
      expect(calculator.currentOperand).toBe('123');
    });

    test('should handle decimal points', () => {
      calculator.appendNumber('1');
      calculator.appendNumber('.');
      calculator.appendNumber('5');
      
      expect(calculator.currentOperand).toBe('1.5');
    });

    test('should prevent multiple decimal points', () => {
      calculator.appendNumber('1');
      calculator.appendNumber('.');
      calculator.appendNumber('5');
      calculator.appendNumber('.');
      calculator.appendNumber('3');
      
      expect(calculator.currentOperand).toBe('1.53');
    });
  });

  describe('Clear Operations', () => {
    test('should clear all when AC is pressed', () => {
      calculator.appendNumber('123');
      calculator.chooseOperation('+');
      calculator.appendNumber('456');
      calculator.clear();
      
      expect(calculator.currentOperand).toBe('');
      expect(calculator.previousOperand).toBe('');
      expect(calculator.operation).toBeUndefined();
    });

    test('should delete last character when DEL is pressed', () => {
      calculator.appendNumber('123');
      calculator.delete();
      
      expect(calculator.currentOperand).toBe('12');
    });
  });

  describe('Display Updates', () => {
    test('should update display when numbers are entered', () => {
      calculator.appendNumber('5');
      calculator.updateDisplay();
      
      const currentElement = document.querySelector('[data-current-operand]');
      expect(currentElement.innerText).toBe('5');
    });

    test('should format large numbers with commas', () => {
      calculator.currentOperand = '1234567';
      calculator.updateDisplay();
      
      const currentElement = document.querySelector('[data-current-operand]');
      expect(currentElement.innerText).toBe('1,234,567');
    });
  });

  describe('Advanced Functions', () => {
    test('should calculate square root correctly', () => {
      calculator.appendNumber('16');
      calculator.calculateSquareRoot();
      
      expect(calculator.currentOperand).toBe(4);
    });

    test('should handle negative square root', () => {
      calculator.appendNumber('-4');
      calculator.calculateSquareRoot();
      
      expect(calculator.currentOperand).toBe('Error');
    });

    test('should calculate percentage correctly', () => {
      calculator.appendNumber('50');
      calculator.calculatePercentage();
      
      expect(calculator.currentOperand).toBe(0.5);
    });

    test('should toggle sign correctly', () => {
      calculator.appendNumber('5');
      calculator.toggleSign();
      
      expect(calculator.currentOperand).toBe(-5);
      
      calculator.toggleSign();
      expect(calculator.currentOperand).toBe(5);
    });
  });
});
