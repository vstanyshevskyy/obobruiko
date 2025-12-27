/**
 * Transform questions data for questionnaire
 * @param {Array} questions - Raw questions from GraphQL
 * @param {string} id - Page ID for generating unique IDs
 * @returns {Array} Transformed questions with unique IDs
 */
export const transformQuestions = (questions, id) => questions.map((q, qidx) => ({
  ...q,
  questionText: q.text,
  id: `${id}-q-${qidx}`,
  answers: q.answers.map((a, aidx) => ({
    ...a,
    id: `${id}-q-${qidx}-a-${aidx}`,
    defaultChecked: aidx === 0
  }))
}));

/**
 * Transform results data for questionnaire
 * @param {Array} results - Raw results from GraphQL
 * @param {string} id - Page ID for generating unique IDs
 * @returns {Array} Transformed results with unique IDs
 */
export const transformResults = (results, id) => results.map((r, ridx) => ({ ...r, id: `${id}-r-${ridx}` }));

/**
 * Calculate score from selected answers
 * @param {Object} scores - Object mapping question IDs to answer IDs
 * @param {Array} questions - Array of question objects
 * @returns {number} Total score
 */
export const calculateScore = (scores, questions) => (Object.keys(scores) || [])
  .map(questionId => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return 0;

    const selectedAnswer = question.answers.find(
      a => a.id === scores[questionId]
    );
    return selectedAnswer ? selectedAnswer.value : 0;
  })
  .reduce((acc, val) => acc + val, 0);

/**
 * Group scores by subscale
 * @param {Object} scores - Object mapping question IDs to answer IDs
 * @param {Array} questions - Array of question objects
 * @returns {Object} Object mapping subscale names to scores
 */
export const groupScoresBySubscale = (scores, questions) => {
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
 * Get result text for each subscale based on score
 * @param {Object} scoresBySubscale - Object mapping subscale names to scores
 * @param {Array} results - Array of result objects
 * @returns {Object} Object mapping subscale names to score and text
 */
export const getSubscaleResults = (scoresBySubscale, results) => {
  const subscaleResults = {};

  Object.keys(scoresBySubscale).forEach(subscale => {
    const result = results.find(
      r => r.subscale === subscale
        && scoresBySubscale[subscale] >= r.minScore
        && scoresBySubscale[subscale] <= r.maxScore
    );

    subscaleResults[subscale] = {
      score: scoresBySubscale[subscale],
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
