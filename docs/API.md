# API Documentation

This document describes the public API of the Enhanced Calculator application.

## Calculator Class

The main `Calculator` class provides all calculator functionality.

### Constructor

```javascript
const calculator = new Calculator(previousOperandSelector, currentOperandSelector);
```

**Parameters:**
- `previousOperandSelector` (string): CSS selector for the previous operand display element
- `currentOperandSelector` (string): CSS selector for the current operand display element

### Public Methods

#### `appendNumber(number)`
Appends a number or decimal point to the current operand.

**Parameters:**
- `number` (string): The number or decimal point to append

**Example:**
```javascript
calculator.appendNumber('5');
calculator.appendNumber('.');
calculator.appendNumber('7');
// Result: 5.7
```

#### `chooseOperation(operation)`
Sets the operation to be performed.

**Parameters:**
- `operation` (string): The operation (+, -, ×, ÷)

**Example:**
```javascript
calculator.chooseOperation('+');
```

#### `compute()`
Performs the calculation with the current operands and operation.

**Example:**
```javascript
calculator.appendNumber('5');
calculator.chooseOperation('+');
calculator.appendNumber('3');
calculator.compute();
// Result: 8
```

#### `clear()`
Clears all calculator state.

**Example:**
```javascript
calculator.clear();
```

#### `delete()`
Removes the last entered digit from the current operand.

**Example:**
```javascript
calculator.appendNumber('123');
calculator.delete();
// Current operand: 12
```

#### `updateDisplay()`
Updates the calculator display with current values.

**Example:**
```javascript
calculator.updateDisplay();
```

### Advanced Methods

#### `calculateSquareRoot()`
Calculates the square root of the current operand.

**Example:**
```javascript
calculator.appendNumber('16');
calculator.calculateSquareRoot();
// Result: 4
```

#### `calculatePercentage()`
Converts the current operand to a percentage (divides by 100).

**Example:**
```javascript
calculator.appendNumber('50');
calculator.calculatePercentage();
// Result: 0.5
```

#### `toggleSign()`
Toggles the sign of the current operand.

**Example:**
```javascript
calculator.appendNumber('5');
calculator.toggleSign();
// Result: -5
```

#### `addToHistory(calculation)`
Adds a calculation to the history.

**Parameters:**
- `calculation` (string): The calculation string to add

**Example:**
```javascript
calculator.addToHistory('5 + 3 = 8');
```

#### `clearHistory()`
Clears all calculation history.

**Example:**
```javascript
calculator.clearHistory();
```

#### `getHistory()`
Returns the calculation history array.

**Returns:**
- `Array<string>`: Array of calculation strings

**Example:**
```javascript
const history = calculator.getHistory();
console.log(history); // ['5 + 3 = 8', '10 - 2 = 8']
```

### Theme Methods

#### `toggleTheme()`
Toggles between dark and light themes.

**Example:**
```javascript
calculator.toggleTheme();
```

#### `setTheme(theme)`
Sets a specific theme.

**Parameters:**
- `theme` (string): 'dark' or 'light'

**Example:**
```javascript
calculator.setTheme('dark');
```

### Properties

#### `currentOperand`
The current number being entered or result of last calculation.

**Type:** `string | number`

#### `previousOperand`
The previous operand in a calculation.

**Type:** `string | number`

#### `operation`
The current operation to be performed.

**Type:** `string`

#### `history`
Array of calculation history.

**Type:** `Array<string>`

#### `theme`
Current theme setting.

**Type:** `string` ('dark' | 'light')

## Events

The calculator emits custom events for various actions:

### `calculation-complete`
Fired when a calculation is completed.

```javascript
document.addEventListener('calculation-complete', (event) => {
  console.log('Calculation result:', event.detail.result);
});
```

### `theme-changed`
Fired when the theme is changed.

```javascript
document.addEventListener('theme-changed', (event) => {
  console.log('New theme:', event.detail.theme);
});
```

### `history-updated`
Fired when the calculation history is updated.

```javascript
document.addEventListener('history-updated', (event) => {
  console.log('History length:', event.detail.history.length);
});
```

### `error-occurred`
Fired when an error occurs during calculation.

```javascript
document.addEventListener('error-occurred', (event) => {
  console.log('Error:', event.detail.error);
});
```

## Storage API

The calculator uses localStorage for persistence:

### Keys Used
- `calculator-theme`: Stores the current theme preference
- `calculator-history`: Stores the calculation history array

### Storage Methods

#### `saveToStorage(key, value)`
Saves data to localStorage.

**Parameters:**
- `key` (string): Storage key
- `value` (any): Value to store

#### `loadFromStorage(key, defaultValue)`
Loads data from localStorage.

**Parameters:**
- `key` (string): Storage key
- `defaultValue` (any): Default value if key doesn't exist

**Returns:** The stored value or default value

## Keyboard Shortcuts

| Key | Action | Method |
|-----|--------|---------|
| `0-9` | Number input | `appendNumber()` |
| `.` | Decimal point | `appendNumber('.')` |
| `+` | Addition | `chooseOperation('+')` |
| `-` | Subtraction | `chooseOperation('-')` |
| `*` | Multiplication | `chooseOperation('×')` |
| `/` | Division | `chooseOperation('÷')` |
| `Enter` or `=` | Calculate | `compute()` |
| `Escape` | Clear | `clear()` |
| `Backspace` | Delete | `delete()` |
| `Ctrl+T` | Toggle theme | `toggleTheme()` |
| `Ctrl+H` | Toggle history | History panel |
| `Alt+R` | Square root | `calculateSquareRoot()` |
| `%` | Percentage | `calculatePercentage()` |
| `Alt+S` | Toggle sign | `toggleSign()` |

## Error Handling

The calculator handles various error conditions:

### Division by Zero
```javascript
calculator.appendNumber('5');
calculator.chooseOperation('÷');
calculator.appendNumber('0');
calculator.compute();
// Result: 'Error'
```

### Invalid Operations
- Square root of negative numbers
- Invalid number formats
- Overflow conditions

### Error Recovery
After an error, the calculator can be reset using `clear()` or by entering a new number.

## Browser Compatibility

### Required Features
- ES6 Classes
- Local Storage
- CSS Custom Properties
- Service Workers (for PWA features)

### Supported Browsers
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Considerations

### Optimization Features
- Efficient DOM updates
- Debounced input handling
- Lazy loading of features
- Memory-efficient history management

### Best Practices
- Use `updateDisplay()` sparingly
- Clear history periodically for long-running sessions
- Monitor localStorage usage

## Security

### XSS Prevention
- All user input is sanitized
- No `eval()` or similar dangerous functions
- Content Security Policy headers recommended

### Data Privacy
- All data stored locally
- No external API calls
- No user tracking

## Testing

### Unit Tests
Test the Calculator class methods:

```javascript
import { Calculator } from './calculator.js';

const calculator = new Calculator('[data-previous]', '[data-current]');
calculator.appendNumber('5');
calculator.chooseOperation('+');
calculator.appendNumber('3');
calculator.compute();

expect(calculator.currentOperand).toBe(8);
```

### Integration Tests
Test UI interactions and event handling.

### E2E Tests
Test complete user workflows with Cypress.

## Migration Guide

### From v1.x to v2.x
- Constructor now requires DOM selectors
- All methods now return consistent types
- Events are now standardized
- Storage format has changed

## Support

For questions about the API, please:
1. Check the [FAQ](../README.md#faq)
2. Search [existing issues](https://github.com/yourusername/enhanced-calculator/issues)
3. Create a [new issue](https://github.com/yourusername/enhanced-calculator/issues/new)
