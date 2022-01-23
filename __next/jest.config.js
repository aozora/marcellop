module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest'
  },
  // watchPlugins: [
  //   'jest-watch-typeahead/filename',
  //   'jest-watch-typeahead/testname',
  // ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '^@/blocks(.*)$': '<rootDir>/blocks/$1',
    '^@/components(.*)$': '<rootDir>/components/$1',
    '^@/lib(.*)$': '<rootDir>/lib/$1',
    '^@/queries(.*)$': '<rootDir>/queries/$1',
    '^@/styles(.*)$': '<rootDir>/styles/$1',
    '^@/types(.*)$': '<rootDir>/types/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
