/**
 * Unit tests for Calculator class
 * Tests core calculation functionality and error handling
 */

import { Calculator } from '../../src/js/calculator.js';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div class="calculator">
        <div class="display">
          <div class="current-operand" data-current-operand>0</div>
          <div class="previous-operand" data-previous-operand></div>
        </div>
        <div class="calculator-grid">
          <button data-all-clear class="span-two">AC</button>
          <button data-delete>DEL</button>
          <button data-operation>÷</button>
          <button data-number>7</button>
          <button data-number>8</button>
          <button data-number>9</button>
          <button data-operation>×</button>
          <button data-number>4</button>
          <button data-number>5</button>
          <button data-number>6</button>
          <button data-operation>-</button>
          <button data-number>1</button>
          <button data-number>2</button>
          <button data-number>3</button>
          <button data-operation>+</button>
          <button data-number>0</button>
          <button data-number>.</button>
          <button data-equals>=</button>
        </div>
      </div>
    `;

    calculator = new Calculator(
      '[data-previous-operand]',
      '[data-current-operand]'
    );
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
