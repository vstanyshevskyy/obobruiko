// Jest setup file
import '@testing-library/jest-dom';

// Mock Gatsby's global __PATH_PREFIX__
global.___loader = {
  enqueue: jest.fn()
};

// Mock gatsby module
jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, children, ...rest }) => {
    const mockReact = require('react');
    return mockReact.createElement('a', { href: to, ...rest }, children);
  }),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn()
}));

// Mock gatsby-plugin-image
jest.mock('gatsby-plugin-image', () => ({
  GatsbyImage: jest.fn().mockImplementation(({ image, alt }) => {
    const mockReact = require('react');
    return mockReact.createElement('img', { src: image?.images?.fallback?.src, alt });
  }),
  StaticImage: jest.fn().mockImplementation(({ src, alt }) => {
    const mockReact = require('react');
    return mockReact.createElement('img', { src, alt });
  }),
  getImage: jest.fn()
}));

// Suppress console warnings in tests (optional)
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
