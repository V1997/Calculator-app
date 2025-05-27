module.exports = {
  // Test environment
  testEnvironment: 'jsdom',
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Test file patterns
  testMatch: [
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.spec.js',
  ],
  
  // Module paths
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  
  // Transform files - disable for ES modules
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
  
  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'public/js/**/*.js',
    '!public/js/**/*.test.js',
    '!public/js/**/*.spec.js',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov',
    'clover',
  ],
  
  // Mock files
  moduleFileExtensions: ['js', 'json'],
  
  // Ignore patterns
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/coverage/',
  ],
  
  // Clear mocks
  clearMocks: true,
  
  // Verbose output
  verbose: true,
  
  // Error handling
  bail: false,
  errorOnDeprecated: true,
  
  // Timeouts
  testTimeout: 10000,
};
