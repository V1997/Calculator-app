/**
 * Simple Calculator Tests
 * Tests using the actual Calculator API
 */

const { Calculator } = require('../../src/js/calculator.js');

describe('Calculator Simple Tests', () => {
  let calculator;

  beforeEach(() => {    // Setup minimal DOM structure
    document.body.innerHTML = `
      <main class="app">
        <button class="theme-toggle" id="theme-toggle">
          <span class="theme-icon">🌙</span>
        </button>
        <section class="calculator">
          <div class="calculator-display">
            <div class="display-history" id="history-display"></div>
            <h1 id="main-display">0</h1>
            <div class="error-message" id="error-message"></div>
          </div>
          <div class="scientific-buttons">
            <button class="function" value="sqrt">√</button>
            <button class="function" value="percent">%</button>
            <button class="function" value="plusminus">±</button>
            <button class="clear-all" id="clear-all-btn">AC</button>
          </div>
          <div class="calculator-buttons">
            <button class="operator" value="/">÷</button>
            <button class="operator" value="*">×</button>
            <button class="operator" value="-">-</button>
            <button class="operator" value="+">+</button>
            <button value="7">7</button>
            <button value="8">8</button>
            <button value="9">9</button>
            <button class="clear" id="clear-btn">C</button>
            <button value="4">4</button>
            <button value="5">5</button>
            <button value="6">6</button>
            <button class="backspace" id="backspace-btn">⌫</button>
            <button value="1">1</button>
            <button value="2">2</button>
            <button value="3">3</button>
            <button class="equal-sign operator" value="=">=</button>
            <button value="0" class="zero">0</button>
            <button class="decimal" value=".">.</button>
          </div>
          <div class="history-panel" id="history-panel">
            <div class="history-header">
              <h3>History</h3>
              <button class="clear-history" id="clear-history-btn">Clear</button>
            </div>
            <div class="history-list" id="history-list"></div>
          </div>
        </section>
        <button class="history-toggle" id="history-toggle">📋</button>
      </main>
    `;

    calculator = new Calculator();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Basic Number Input', () => {
    test('should input single numbers', () => {
      calculator.inputNumber('5');
      expect(calculator.currentValue).toBe('5');
    });

    test('should input multiple digits', () => {
      calculator.inputNumber('1');
      calculator.inputNumber('2');
      calculator.inputNumber('3');
      expect(calculator.currentValue).toBe('123');
    });
  });

  describe('Basic Arithmetic', () => {
    test('should add two numbers', () => {
      calculator.inputNumber('5');
      calculator.handleOperator('+');
      calculator.inputNumber('3');
      calculator.handleOperator('=');
      expect(calculator.currentValue).toBe('8');
    });

    test('should subtract two numbers', () => {
      calculator.inputNumber('10');
      calculator.handleOperator('-');
      calculator.inputNumber('4');
      calculator.handleOperator('=');
      expect(calculator.currentValue).toBe('6');
    });

    test('should multiply two numbers', () => {
      calculator.inputNumber('6');
      calculator.handleOperator('*');
      calculator.inputNumber('7');
      calculator.handleOperator('=');
      expect(calculator.currentValue).toBe('42');
    });

    test('should divide two numbers', () => {
      calculator.inputNumber('15');
      calculator.handleOperator('/');
      calculator.inputNumber('3');
      calculator.handleOperator('=');
      expect(calculator.currentValue).toBe('5');
    });
  });

  describe('Special Functions', () => {
    test('should calculate square root', () => {
      calculator.inputNumber('16');
      calculator.handleFunction('sqrt');
      expect(calculator.currentValue).toBe('4');
    });

    test('should calculate percentage', () => {
      calculator.inputNumber('50');
      calculator.handleFunction('percent');
      expect(calculator.currentValue).toBe('0.5');
    });

    test('should toggle sign', () => {
      calculator.inputNumber('5');
      calculator.handleFunction('plusminus');
      expect(calculator.currentValue).toBe('-5');
    });
  });

  describe('Clear Operations', () => {
    test('should clear current value', () => {
      calculator.inputNumber('123');
      calculator.clear();
      expect(calculator.currentValue).toBe('0');
    });

    test('should clear all values', () => {
      calculator.inputNumber('5');
      calculator.handleOperator('+');
      calculator.inputNumber('3');
      calculator.clearAll();
      expect(calculator.currentValue).toBe('0');
      expect(calculator.previousValue).toBe(null);
      expect(calculator.operator).toBe(null);
    });
  });

  describe('Display Updates', () => {
    test('should update display element', () => {
      calculator.inputNumber('123');
      const display = document.getElementById('main-display');
      expect(display.textContent).toBe('123');
    });
  });
});
