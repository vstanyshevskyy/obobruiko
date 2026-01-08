/**
 * Tests for helper utility functions
 */

import { getUniqueId, CardClickHelper } from '../helpers';

describe('getUniqueId', () => {
  it('converts simple text to slug', () => {
    expect(getUniqueId('Hello World')).toBe('hello-world');
  });

  it('handles multiple spaces correctly', () => {
    expect(getUniqueId('Test   Multiple    Spaces')).toBe('test-multiple-spaces');
  });

  it('removes special characters', () => {
    expect(getUniqueId('Hello@World#Test!')).toBe('helloworldtest');
  });

  it('removes leading and trailing hyphens', () => {
    expect(getUniqueId('-Hello World-')).toBe('hello-world');
    expect(getUniqueId('---Test---')).toBe('test');
  });

  it('handles consecutive hyphens', () => {
    expect(getUniqueId('Hello---World')).toBe('hello-world');
  });

  it('converts to lowercase', () => {
    expect(getUniqueId('UPPERCASE TEXT')).toBe('uppercase-text');
    expect(getUniqueId('MiXeD CaSe')).toBe('mixed-case');
  });

  it('removes non-ASCII characters (Ukrainian, special chars)', () => {
    // The current implementation removes all non-word characters except hyphens
    // Cyrillic and other non-ASCII characters are removed
    expect(getUniqueId('Привіт Світ')).toBe('');
    expect(getUniqueId('Hello Привіт')).toBe('hello');
  });

  it('handles numbers correctly', () => {
    expect(getUniqueId('Test 123 Numbers')).toBe('test-123-numbers');
  });

  it('handles empty string', () => {
    expect(getUniqueId('')).toBe('');
  });

  it('removes Cyrillic from article paths (current behavior)', () => {
    // Note: In production, article paths with Cyrillic are likely pre-processed
    // The getUniqueId function itself removes non-ASCII characters
    expect(getUniqueId('Як будувати близькі стосунки')).toBe('');
    expect(getUniqueId('dont-worry-anxiety-disorder')).toBe('dont-worry-anxiety-disorder');
  });

  it('handles already formatted slugs', () => {
    expect(getUniqueId('already-formatted-slug')).toBe('already-formatted-slug');
  });
});

describe('CardClickHelper', () => {
  let helper;

  beforeEach(() => {
    helper = new CardClickHelper();
  });

  describe('initialization', () => {
    it('initializes with empty links array', () => {
      expect(helper.links).toEqual([]);
    });

    it('has default click threshold of 200ms', () => {
      expect(helper.clickThreshhold).toBe(200);
    });
  });

  describe('addLink', () => {
    it('adds link at default index 0', () => {
      const mockLink = { click: jest.fn() };
      helper.addLink(mockLink);
      
      expect(helper.links[0]).toBe(mockLink);
    });

    it('adds link at specified index', () => {
      const mockLink1 = { click: jest.fn() };
      const mockLink2 = { click: jest.fn() };
      
      helper.addLink(mockLink1, 0);
      helper.addLink(mockLink2, 1);
      
      expect(helper.links[0]).toBe(mockLink1);
      expect(helper.links[1]).toBe(mockLink2);
    });
  });

  describe('click detection', () => {
    let mockLink;
    let mockEvent;

    beforeEach(() => {
      mockLink = { click: jest.fn() };
      helper.addLink(mockLink);
      mockEvent = { button: 0 };
      
      // Mock Date.now() for consistent timing
      jest.spyOn(Date, 'now');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('triggers click for quick press (under threshold)', () => {
      Date.now.mockReturnValueOnce(1000); // mousedown
      helper.onMouseDown(mockEvent);
      
      Date.now.mockReturnValueOnce(1100); // mouseup after 100ms
      helper.onMouseUp(mockEvent);
      
      expect(mockLink.click).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click for slow press (over threshold)', () => {
      jest.useFakeTimers();
      const startTime = Date.now();
      
      helper.onMouseDown(mockEvent);
      jest.advanceTimersByTime(300);
      helper.onMouseUp(mockEvent);
      
      expect(mockLink.click).not.toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('triggers click at exactly threshold boundary', () => {
      Date.now.mockReturnValueOnce(1000); // mousedown
      helper.onMouseDown(mockEvent);
      
      Date.now.mockReturnValueOnce(1199); // mouseup after 199ms (just under)
      helper.onMouseUp(mockEvent);
      
      expect(mockLink.click).toHaveBeenCalledTimes(1);
    });

    it('ignores non-left-button clicks (button !== 0)', () => {
      const rightClickEvent = { button: 2 };
      
      Date.now.mockReturnValueOnce(1000);
      helper.onMouseDown(rightClickEvent);
      
      Date.now.mockReturnValueOnce(1100);
      helper.onMouseUp(rightClickEvent);
      
      expect(mockLink.click).not.toHaveBeenCalled();
    });

    it('handles multiple links with index parameter', () => {
      const mockLink1 = { click: jest.fn() };
      const mockLink2 = { click: jest.fn() };
      
      helper.addLink(mockLink1, 0);
      helper.addLink(mockLink2, 1);
      
      Date.now.mockReturnValueOnce(1000);
      helper.onMouseDown(mockEvent);
      
      Date.now.mockReturnValueOnce(1100);
      helper.onMouseUp(mockEvent, 1); // Click second link
      
      expect(mockLink1.click).not.toHaveBeenCalled();
      expect(mockLink2.click).toHaveBeenCalledTimes(1);
    });

    it('defaults to index 0 when not specified', () => {
      Date.now.mockReturnValueOnce(1000);
      helper.onMouseDown(mockEvent);
      
      Date.now.mockReturnValueOnce(1100);
      helper.onMouseUp(mockEvent); // No index specified
      
      expect(mockLink.click).toHaveBeenCalledTimes(1);
    });
  });

  describe('real-world usage scenarios', () => {
    it('prevents click on drag action (mouse held for 300ms)', () => {
      const mockLink = { click: jest.fn() };
      helper.addLink(mockLink);
      
      const mouseEvent = { button: 0 };
      
      jest.useFakeTimers();
      helper.onMouseDown(mouseEvent);
      jest.advanceTimersByTime(300);
      helper.onMouseUp(mouseEvent);
      
      expect(mockLink.click).not.toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('allows quick click on article card', () => {
      const mockLink = { click: jest.fn() };
      helper.addLink(mockLink);
      
      const mouseEvent = { button: 0 };
      
      jest.spyOn(Date, 'now')
        .mockReturnValueOnce(1000) // mousedown
        .mockReturnValueOnce(1050); // mouseup (quick click)
      
      helper.onMouseDown(mouseEvent);
      helper.onMouseUp(mouseEvent);
      
      expect(mockLink.click).toHaveBeenCalledTimes(1);
      
      jest.restoreAllMocks();
    });
  });
});
