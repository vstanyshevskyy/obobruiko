/**
 * Example component test demonstrating React Testing Library patterns
 * Tests a simple Tile component to show best practices
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// This is a mock of the Tile component for demonstration
// In reality, you'd import the actual component
const MockTile = ({ title, description, link }) => (
  <div className="tile" data-testid="tile">
    <h3>{title}</h3>
    <p>{description}</p>
    {link && <a href={link}>Learn more</a>}
  </div>
);

describe('Tile Component (Example)', () => {
  describe('Rendering', () => {
    it('renders with required props', () => {
      render(
        <MockTile 
          title="Test Title" 
          description="Test description" 
        />
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders link when provided', () => {
      render(
        <MockTile 
          title="Test Title" 
          description="Test description"
          link="/test-link"
        />
      );
      
      const link = screen.getByRole('link', { name: /learn more/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test-link');
    });

    it('does not render link when not provided', () => {
      render(
        <MockTile 
          title="Test Title" 
          description="Test description"
        />
      );
      
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
  });

  describe('Content', () => {
    it('displays correct title text', () => {
      const title = 'Як будувати близькі стосунки';
      render(<MockTile title={title} description="Test" />);
      
      expect(screen.getByText(title)).toBeInTheDocument();
    });

    it('displays correct description text', () => {
      const description = 'Дізнайтесь про психічне здоров\'я';
      render(<MockTile title="Test" description={description} />);
      
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    it('handles long content without breaking', () => {
      const longDescription = 'Lorem ipsum '.repeat(50);
      
      render(
        <MockTile 
          title="Test" 
          description={longDescription}
        />
      );
      
      // Check that the paragraph exists with the long text (use partial match)
      const paragraph = screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && content.startsWith('Lorem ipsum');
      });
      expect(paragraph).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic heading for title', () => {
      render(<MockTile title="Test Title" description="Test" />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Test Title');
    });

    it('link has accessible name', () => {
      render(
        <MockTile 
          title="Test" 
          description="Test"
          link="/test"
        />
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveAccessibleName();
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot with all props', () => {
      const { container } = render(
        <MockTile 
          title="Snapshot Test" 
          description="This is a snapshot test"
          link="/snapshot-link"
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot without link', () => {
      const { container } = render(
        <MockTile 
          title="No Link" 
          description="Tile without link"
        />
      );
      
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});

/**
 * TESTING PATTERNS TO FOLLOW:
 * 
 * 1. Organize tests by feature/behavior using describe blocks
 * 2. Use screen queries from @testing-library/react:
 *    - getByRole (preferred for accessibility)
 *    - getByText (for content checks)
 *    - getByTestId (as last resort)
 *    - queryBy* (when checking element doesn't exist)
 * 
 * 3. Test user-facing behavior, not implementation details
 * 4. Use jest-dom matchers for better assertions:
 *    - toBeInTheDocument()
 *    - toHaveAttribute()
 *    - toHaveTextContent()
 *    - toBeVisible()
 * 
 * 5. For components with user interaction, use @testing-library/user-event
 * 6. For async behavior, use waitFor, findBy* queries
 * 7. Keep tests focused - one assertion per test when possible
 * 8. Use descriptive test names that explain the behavior
 */
