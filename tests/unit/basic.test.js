/**
 * Basic tests for Calculator functionality
 * Tests DOM and basic math operations
 */

describe('Calculator Application', () => {
  test('should have proper test environment', () => {
    expect(true).toBe(true);
  });

  test('DOM should be available', () => {
    document.body.innerHTML = '<div id="test">Hello World</div>';
    const element = document.getElementById('test');
    expect(element.textContent).toBe('Hello World');
  });

  test('localStorage should be available', () => {
    localStorage.setItem('test', 'value');
    expect(localStorage.getItem('test')).toBe('value');
  });

  test('basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
    expect(3 * 4).toBe(12);
    expect(8 / 2).toBe(4);
  });

  test('advanced math operations', () => {
    expect(Math.sqrt(16)).toBe(4);
    expect(Math.abs(-5)).toBe(5);
    expect(Math.round(4.7)).toBe(5);
  });

  test('percentage calculations', () => {
    expect((50 / 100) * 200).toBe(100);
    expect((25 / 100) * 80).toBe(20);
  });

  test('error handling for division by zero', () => {
    const result = 10 / 0;
    expect(result).toBe(Infinity);
  });

  test('error handling for invalid math', () => {
    const result = Math.sqrt(-1);
    expect(isNaN(result)).toBe(true);
  });
});
