export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@icons(.*)$': '<rootDir>/src/components/icons$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@src(.*)$': '<rootDir>/src$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json'
    }]
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
