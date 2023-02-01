module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: ['<rootDir>/src/**/{!(global-const),}.ts', '!<rootDir>/src/main/**',],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/controllers/(.*)': '<rootDir>/src/application/controllers/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
