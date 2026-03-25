export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.tsx'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@icons(.*)$': '<rootDir>/src/components/icons$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@src(.*)$': '<rootDir>/src$1',
    '^@setupTest$': '<rootDir>/src/setupTest.tsx',
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', 'src/setupTest.tsx'],
};
