/* eslint-disable */
export default {
  displayName: 'sls-app',
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
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  coveragePathIgnorePatterns: ['./node_modules/*'],
  modulePathIgnorePatterns: ['./node_modules/*'],
  testMatch: ['<rootDir>/**/*.test.ts'],
};
