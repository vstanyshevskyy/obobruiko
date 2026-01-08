module.exports = {
  // Use jsdom environment for DOM testing
  testEnvironment: 'jest-environment-jsdom',

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transform files with babel-jest
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { presets: ['babel-preset-gatsby'] }]
  },

  // Module name mapper for imports
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '\\.less$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',

    // Handle image imports
    '\\.(jpg|jpeg|png|gif|svg|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',

    // Handle Gatsby module
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/dist/$1',
    '^gatsby-core-utils/(.*)$': 'gatsby-core-utils/dist/$1',
    '^gatsby-plugin-utils/(.*)$': [
      'gatsby-plugin-utils/dist/$1',
      'gatsby-plugin-utils/$1'
    ]
  },

  // Paths to ignore
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.cache/',
    '/public/',
    '/static/',
    '/__tests__/utils/'
  ],

  // Transform ignore patterns
  transformIgnorePatterns: [
    '/node_modules/(?!(gatsby|gatsby-script|gatsby-link)/)'
  ],

  // Collect coverage from these files
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
    '!src/pages/_*.{js,jsx}',
    '!src/pages/404.js',
    '!src/pages/admin.js'
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 40,
      functions: 40,
      lines: 50
    }
  },

  // Globals for Gatsby
  globals: {
    __PATH_PREFIX__: '',
    __BASE_PATH__: '',
    __ASSET_PREFIX__: ''
  }
};
