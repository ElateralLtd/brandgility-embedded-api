module.exports = {
  testRegex: '^.+\\.test\\.js$',
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
  ],
  coverageDirectory: 'reports/test/coverage',
  reporters: [
    'default',
    'jest-junit',
  ],
};
