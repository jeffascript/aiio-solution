export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.svg\\?react$': 'jest-svg-transformer',
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  setupFilesAfterEnv: ['./setupTests.ts'],

  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'src'],
  //   moduleNameMapper: {
  //     "src/(.*)": "<rootDir>/src/$1",
  //   },

  //   moduleDirectories: ['node_modules', 'client'],
}
