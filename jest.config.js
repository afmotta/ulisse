module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    'ts-jest': {
      extends: './babel.config.js',
      diagnostics: false,
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '@shipfirst/(.+)$': '<rootDir>packages/$1/src',
  },
  modulePathIgnorePatterns: ['dist'],
  roots: ['<rootDir>packages'],
  setupFilesAfterEnv: ['<rootDir>jest/setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/__tests__/*.+(ts|tsx|js)', '**/*.test.+(ts|tsx|js)'],
  testPathIgnorePatterns: ['packages/ui'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
