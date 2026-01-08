import React from 'react';

/**
 * Test utilities and mock data factories
 */

/**
 * Mock language context provider for testing
 */
export const MockLanguageProvider = ({ language = 'UK', children }) => {
  const LanguageContext = require('../../context/LanguageContext').default;
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Mock theme context provider for testing
 */
export const MockThemeProvider = ({ isDark = false, children }) => {
  const ThemeContext = require('../../context/ThemeContext').default;
  const value = {
    isDarkModeEnabled: isDark,
    toggleDark: jest.fn()
  };
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Factory for creating mock questionnaire questions
 */
export const createMockQuestion = (overrides = {}) => ({
  id: 'q1',
  text: 'Test question',
  subscale: 'default',
  minScore: 0,
  answers: [
    { id: 'a1', text: 'Not at all', value: 0 },
    { id: 'a2', text: 'Several days', value: 1 },
    { id: 'a3', text: 'More than half', value: 2 },
    { id: 'a4', text: 'Nearly every day', value: 3 }
  ],
  ...overrides
});

/**
 * Factory for creating mock questionnaire results
 */
export const createMockResult = (overrides = {}) => ({
  text: 'Test result description',
  minScore: 0,
  maxScore: 4,
  subscale: 'default',
  color: '#00b77b',
  ...overrides
});

/**
 * Factory for creating mock article/page content
 */
export const createMockContent = (overrides = {}) => ({
  language: 'UK',
  path: '/test-path',
  title: 'Test Title',
  description: 'Test description',
  metaDescription: 'Test meta',
  publishTime: '2021-01-01T00:00:00.000Z',
  ...overrides
});

/**
 * Mock Gatsby image data
 */
export const mockImageData = {
  images: {
    fallback: {
      src: '/test-image.jpg',
      srcSet: '/test-image.jpg 1x',
      sizes: '100vw'
    }
  },
  layout: 'constrained',
  width: 800,
  height: 600
};

/**
 * Mock SEO defaults
 */
export const mockSeoDefaults = {
  language: 'UK',
  title: 'Олеся Бобруйко. Психолог',
  url: 'https://www.bobruiko.com',
  metaDescription: 'Test meta description',
  fbTitle: 'Test FB Title',
  fbDescription: 'Test FB Description',
  fbImage: { relativePath: 'og_image.jpg' },
  favicon: { relativePath: 'favicon.ico' }
};

/**
 * Render with all providers (convenience wrapper)
 */
export const renderWithProviders = (
  ui,
  { language = 'UK', isDark = false, ...renderOptions } = {}
) => {
  const { render } = require('@testing-library/react');
  
  const Wrapper = ({ children }) => (
    <MockLanguageProvider language={language}>
      <MockThemeProvider isDark={isDark}>
        {children}
      </MockThemeProvider>
    </MockLanguageProvider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

/**
 * Wait for async updates (useful for state updates)
 */
export const waitForAsync = () => 
  new Promise(resolve => setTimeout(resolve, 0));
