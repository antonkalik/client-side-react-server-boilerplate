module.exports = {
  clearMocks: true,
  transform: {
    '.*': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  coverageDirectory: 'coverage',
  verbose: true,
  testURL: 'http://localhost/',
  testMatch: ['**/?(*.)(spec).js'],
};
