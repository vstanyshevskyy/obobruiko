/**
 * Tests for questionnaire scoring logic
 * This is CRITICAL business logic - these tests ensure mental health assessments are accurate
 */

import { createMockQuestion, createMockResult } from '../../../__tests__/utils/helpers';
import {
  calculateTotalScore,
  groupScoresBySubscale,
  getResultForScore,
  getSubscaleResults,
  hasMultipleSubscales,
  prepareSubscaleResults
} from '../utils/scoring';

describe('Questionnaire Scoring Logic', () => {
  describe('calculateTotalScore', () => {
    it('calculates correct total score with all questions answered', () => {
      const questions = [
        createMockQuestion({ id: 'q1' }),
        createMockQuestion({ id: 'q2' }),
        createMockQuestion({ id: 'q3' })
      ];

      const scores = {
        q1: 'a2', // value: 1
        q2: 'a3', // value: 2
        q3: 'a4'  // value: 3
      };

      expect(calculateTotalScore(questions, scores)).toBe(6);
    });

    it('calculates correct score with partial answers', () => {
      const questions = [
        createMockQuestion({ id: 'q1' }),
        createMockQuestion({ id: 'q2' }),
        createMockQuestion({ id: 'q3' })
      ];

      const scores = {
        q1: 'a2', // value: 1
        q3: 'a4'  // value: 3
        // q2 not answered
      };

      expect(calculateTotalScore(questions, scores)).toBe(4);
    });

    it('handles empty scores object', () => {
      const questions = [
        createMockQuestion({ id: 'q1' }),
        createMockQuestion({ id: 'q2' })
      ];

      expect(calculateTotalScore(questions, {})).toBe(0);
    });

    it('returns 0 for missing answer values', () => {
      const questions = [createMockQuestion({ id: 'q1' })];
      const scores = { q1: 'nonexistent-answer-id' };

      expect(calculateTotalScore(questions, scores)).toBe(0);
    });
  });

  describe('groupScoresBySubscale', () => {
    it('groups scores correctly by single subscale', () => {
      const questions = [
        createMockQuestion({ id: 'q1', subscale: 'default' }),
        createMockQuestion({ id: 'q2', subscale: 'default' }),
        createMockQuestion({ id: 'q3', subscale: 'default' })
      ];

      const scores = {
        q1: 'a2', // value: 1
        q2: 'a3', // value: 2
        q3: 'a4'  // value: 3
      };

      const result = groupScoresBySubscale(questions, scores);

      expect(result).toEqual({
        default: 6
      });
    });

    it('groups scores correctly by multiple subscales', () => {
      const questions = [
        createMockQuestion({ id: 'q1', subscale: 'emotional' }),
        createMockQuestion({ id: 'q2', subscale: 'emotional' }),
        createMockQuestion({ id: 'q3', subscale: 'depersonalization' }),
        createMockQuestion({ id: 'q4', subscale: 'depersonalization' }),
        createMockQuestion({ id: 'q5', subscale: 'achievement' })
      ];

      const scores = {
        q1: 'a3', // emotional: 2
        q2: 'a2', // emotional: 1
        q3: 'a4', // depersonalization: 3
        q4: 'a3', // depersonalization: 2
        q5: 'a2'  // achievement: 1
      };

      const result = groupScoresBySubscale(questions, scores);

      expect(result).toEqual({
        emotional: 3,
        depersonalization: 5,
        achievement: 1
      });
    });

    it('handles partial answers across subscales', () => {
      const questions = [
        createMockQuestion({ id: 'q1', subscale: 'emotional' }),
        createMockQuestion({ id: 'q2', subscale: 'depersonalization' })
      ];

      const scores = {
        q1: 'a3' // only q1 answered, value: 2
        // q2 not answered
      };

      const result = groupScoresBySubscale(questions, scores);

      expect(result).toEqual({
        emotional: 2,
        depersonalization: 0
      });
    });
  });

  describe('getResultForScore', () => {
    it('matches correct result for GAD-7 minimal anxiety (0-4)', () => {
      const results = [
        createMockResult({ text: 'Minimal Anxiety', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Mild Anxiety', minScore: 5, maxScore: 9 })
      ];

      expect(getResultForScore(0, results)).toMatchObject({ text: 'Minimal Anxiety' });
      expect(getResultForScore(4, results)).toMatchObject({ text: 'Minimal Anxiety' });
    });

    it('matches correct result for GAD-7 mild anxiety (5-9)', () => {
      const results = [
        createMockResult({ text: 'Minimal Anxiety', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Mild Anxiety', minScore: 5, maxScore: 9 }),
        createMockResult({ text: 'Moderate Anxiety', minScore: 10, maxScore: 14 }),
        createMockResult({ text: 'Severe Anxiety', minScore: 15, maxScore: 21 })
      ];

      expect(getResultForScore(5, results)).toMatchObject({ text: 'Mild Anxiety' });
      expect(getResultForScore(7, results)).toMatchObject({ text: 'Mild Anxiety' });
      expect(getResultForScore(9, results)).toMatchObject({ text: 'Mild Anxiety' });
    });

    it('matches correct result for GAD-7 moderate anxiety (10-14)', () => {
      const results = [
        createMockResult({ text: 'Minimal Anxiety', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Mild Anxiety', minScore: 5, maxScore: 9 }),
        createMockResult({ text: 'Moderate Anxiety', minScore: 10, maxScore: 14 }),
        createMockResult({ text: 'Severe Anxiety', minScore: 15, maxScore: 21 })
      ];

      expect(getResultForScore(10, results)).toMatchObject({ text: 'Moderate Anxiety' });
      expect(getResultForScore(12, results)).toMatchObject({ text: 'Moderate Anxiety' });
      expect(getResultForScore(14, results)).toMatchObject({ text: 'Moderate Anxiety' });
    });

    it('matches correct result for GAD-7 severe anxiety (15-21)', () => {
      const results = [
        createMockResult({ text: 'Minimal Anxiety', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Mild Anxiety', minScore: 5, maxScore: 9 }),
        createMockResult({ text: 'Moderate Anxiety', minScore: 10, maxScore: 14 }),
        createMockResult({ text: 'Severe Anxiety', minScore: 15, maxScore: 21 })
      ];

      expect(getResultForScore(15, results)).toMatchObject({ text: 'Severe Anxiety' });
      expect(getResultForScore(18, results)).toMatchObject({ text: 'Severe Anxiety' });
      expect(getResultForScore(21, results)).toMatchObject({ text: 'Severe Anxiety' });
    });

    it('works with subscale parameter', () => {
      const results = [
        createMockResult({ text: 'Low Emotional', minScore: 0, maxScore: 10, subscale: 'emotional' }),
        createMockResult({ text: 'High Emotional', minScore: 11, maxScore: 30, subscale: 'emotional' }),
        createMockResult({ text: 'Low Personal', minScore: 0, maxScore: 10, subscale: 'personal' })
      ];

      expect(getResultForScore(5, results, 'emotional')).toMatchObject({ text: 'Low Emotional' });
      expect(getResultForScore(15, results, 'emotional')).toMatchObject({ text: 'High Emotional' });
      expect(getResultForScore(5, results, 'personal')).toMatchObject({ text: 'Low Personal' });
    });

    it('returns undefined for score outside all ranges', () => {
      const results = [
        createMockResult({ text: 'Minimal', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Severe', minScore: 15, maxScore: 21 })
      ];

      expect(getResultForScore(10, results)).toBeUndefined();
    });
  });

  describe('hasMultipleSubscales', () => {
    it('returns true for multiple subscales', () => {
      const questions = [
        createMockQuestion({ subscale: 'emotional' }),
        createMockQuestion({ subscale: 'depersonalization' })
      ];

      expect(hasMultipleSubscales(questions)).toBe(true);
    });

    it('returns false for single subscale', () => {
      const questions = [
        createMockQuestion({ subscale: 'default' }),
        createMockQuestion({ subscale: 'default' })
      ];

      expect(hasMultipleSubscales(questions)).toBe(false);
    });
  });

  describe('getSubscaleResults', () => {
    it('returns results for all subscales', () => {
      const questions = [
        createMockQuestion({ id: 'q1', subscale: 'emotional' }),
        createMockQuestion({ id: 'q2', subscale: 'depersonalization' })
      ];

      const scores = {
        q1: 'a3', // 2
        q2: 'a2'  // 1
      };

      const results = [
        createMockResult({ text: 'Low Emotional', minScore: 0, maxScore: 5, subscale: 'emotional' }),
        createMockResult({ text: 'Low Depersonalization', minScore: 0, maxScore: 2, subscale: 'depersonalization' })
      ];

      const subscaleResults = getSubscaleResults(questions, scores, results);

      expect(subscaleResults).toEqual({
        emotional: { score: 2, text: 'Low Emotional' },
        depersonalization: { score: 1, text: 'Low Depersonalization' }
      });
    });
  });

  describe('prepareSubscaleResults', () => {
    it('formats subscale results correctly', () => {
      const subscaleResults = {
        emotional: { score: 5, text: 'Low Emotional Exhaustion' },
        depersonalization: { score: 3, text: 'Low Depersonalization' }
      };

      const formatted = prepareSubscaleResults(subscaleResults);

      expect(formatted).toEqual([
        'emotional: 5 (Low Emotional Exhaustion)',
        'depersonalization: 3 (Low Depersonalization)'
      ]);
    });
  });

  describe('Edge Cases', () => {
    it('handles maximum possible score (all 3s in GAD-7)', () => {
      const questions = Array.from({ length: 7 }, (_, i) => 
        createMockQuestion({ id: `q${i + 1}` })
      );

      const scores = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [`q${i + 1}`, 'a4']) // all "Nearly every day" (value: 3)
      );

      expect(calculateTotalScore(questions, scores)).toBe(21);
    });

    it('handles minimum possible score (all 0s in GAD-7)', () => {
      const questions = Array.from({ length: 7 }, (_, i) => 
        createMockQuestion({ id: `q${i + 1}` })
      );

      const scores = Object.fromEntries(
        Array.from({ length: 7 }, (_, i) => [`q${i + 1}`, 'a1']) // all "Not at all" (value: 0)
      );

      expect(calculateTotalScore(questions, scores)).toBe(0);
    });

    it('handles boundary conditions for result matching', () => {
      const results = [
        createMockResult({ text: 'Minimal', minScore: 0, maxScore: 4 }),
        createMockResult({ text: 'Mild', minScore: 5, maxScore: 9 })
      ];

      expect(getResultForScore(4, results).text).toBe('Minimal');
      expect(getResultForScore(5, results).text).toBe('Mild');
    });
  });
});
