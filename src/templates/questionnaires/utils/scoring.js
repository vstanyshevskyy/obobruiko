/**
 * Questionnaire scoring utilities
 * CRITICAL: These functions handle mental health assessment calculations
 * Any changes must be thoroughly tested
 */

/**
 * Calculate total score from user's answers
 * @param {Array} questions - Array of question objects
 * @param {Object} scores - Map of questionId -> answerId
 * @returns {number} Total score
 */
export const calculateTotalScore = (questions, scores) => Object.keys(scores).map(questionId => {
  const question = questions.find(q => q.id === questionId);
  const selectedAnswer = question?.answers.find(a => a.id === scores[questionId]);
  return selectedAnswer ? selectedAnswer.value : 0;
}).reduce((acc, val) => acc + val, 0);

/**
 * Group scores by subscale (for multi-subscale questionnaires like MBI)
 * @param {Array} questions - Array of question objects
 * @param {Object} scores - Map of questionId -> answerId
 * @returns {Object} Map of subscale -> total score
 */
export const groupScoresBySubscale = (questions, scores) => {
  const scoresBySubscale = {};
  questions.forEach(q => {
    const selectedAnswerId = scores[q.id];
    const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId);
    scoresBySubscale[q.subscale] = scoresBySubscale[q.subscale] || 0;
    scoresBySubscale[q.subscale] += selectedAnswer?.value || 0;
  });
  return scoresBySubscale;
};

/**
 * Find the matching result based on score and subscale
 * @param {number} score - The calculated score
 * @param {Array} results - Array of result objects with minScore/maxScore
 * @param {string} subscale - Subscale identifier (default: 'default')
 * @returns {Object|undefined} Matching result object or undefined
 */
export const getResultForScore = (score, results, subscale = 'default') => results.find(r => r.subscale === subscale
    && score >= r.minScore
    && score <= r.maxScore);

/**
 * Get results for all subscales
 * @param {Array} questions - Array of question objects
 * @param {Object} scores - Map of questionId -> answerId
 * @param {Array} results - Array of result objects
 * @returns {Object} Map of subscale -> {score, text}
 */
export const getSubscaleResults = (questions, scores, results) => {
  const scoresBySubscale = groupScoresBySubscale(questions, scores);
  const subscaleResults = {};

  Object.keys(scoresBySubscale).forEach(subscale => {
    const score = scoresBySubscale[subscale];
    const result = getResultForScore(score, results, subscale);
    subscaleResults[subscale] = {
      score,
      text: result?.text || ''
    };
  });

  return subscaleResults;
};

/**
 * Check if questionnaire has multiple subscales
 * @param {Array} questions - Array of question objects
 * @returns {boolean} True if multiple subscales exist
 */
export const hasMultipleSubscales = questions => {
  const scales = questions.map(q => q.subscale);
  const uniqueSubscales = [...new Set(scales)];
  return uniqueSubscales.length > 1;
};

/**
 * Format subscale results for display
 * @param {Object} subscaleResults - Map of subscale -> {score, text}
 * @returns {Array<string>} Formatted strings
 */
export const prepareSubscaleResults = subscaleResults => Object.keys(subscaleResults).map(key => `${key}: ${subscaleResults[key].score} (${subscaleResults[key].text})`);
