/* eslint-disable */
export default {
  displayName: 'test-framework',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
        diagnostics: true,
      },
    ],
  },
  testTimeout: 10000,
  moduleDirectories: ['node_modules', 'src', 'examples'],
  moduleFileExtensions: ['js', 'ts'],
  coveragePathIgnorePatterns: ['./src/*'],
  modulePathIgnorePatterns: ['./src/*'],
  testMatch: ['<rootDir>/examples/**/*.test.ts'],
};
