import React, {
  createContext, useContext, useState, useMemo, useCallback
} from 'react';
import moment from 'moment/moment';
import {
  calculateTotalScore,
  getSubscaleResults,
  hasMultipleSubscales,
  prepareSubscaleResults
} from '../utils/scoring';

const QuestionnaireContext = createContext(null);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
};

export const QuestionnaireProvider = ({ children, data }) => {
  const {
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    resultTemplate,
    copyResultsTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results
  } = data;

  const [scores, setScores] = useState({});

  // Calculate scores
  const totalScore = useMemo(
    () => calculateTotalScore(questions, scores),
    [questions, scores]
  );

  const hasMultipleSubscalesFlag = useMemo(
    () => hasMultipleSubscales(questions),
    [questions]
  );

  const subscaleResults = useMemo(
    () => (hasMultipleSubscalesFlag ? getSubscaleResults(questions, scores, results) : null),
    [hasMultipleSubscalesFlag, questions, scores, results]
  );

  const currentResult = useMemo(
    () => {
      if (hasMultipleSubscalesFlag) return null;
      // For single-subscale questionnaires, find result by score range only
      return results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore);
    },
    [hasMultipleSubscalesFlag, totalScore, results]
  );

  // Track completion
  const answeredCount = Object.keys(scores).length;
  const totalQuestions = questions.length;
  const completionPercentage = (answeredCount / totalQuestions) * 100;
  const isComplete = answeredCount === totalQuestions;

  // Handle answer change
  const handleAnswerChange = useCallback((questionId, answerId) => {
    setScores(prev => ({ ...prev, [questionId]: answerId }));
  }, []);

  // Copy results to clipboard
  const handleCopyResults = useCallback(e => {
    e.preventDefault();

    const questionsAnswers = questions.map(q => {
      const selectedAnswerId = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId) || q.answers[0];
      return `${q.text}\n   ${selectedAnswer.value} = ${selectedAnswer.text}`;
    }).join('\n');

    const scoreText = hasMultipleSubscalesFlag
      ? prepareSubscaleResults(subscaleResults).join(', ')
      : totalScore;

    const copyText = copyResultsTemplate
      .replace('{0}', moment().format('DD.MM.YYYY'))
      .replace('{1}', scoreText)
      .replace('{2}', currentResult?.resultSummary || '')
      .replace('{3}', questionsAnswers);

    navigator.clipboard.writeText(copyText);
  }, [questions, scores, hasMultipleSubscalesFlag, subscaleResults, totalScore, copyResultsTemplate, currentResult]);

  const value = {
    // Static data
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    resultTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,

    // State
    scores,

    // Computed values
    totalScore,
    hasMultipleSubscalesFlag,
    subscaleResults,
    currentResult,
    answeredCount,
    totalQuestions,
    completionPercentage,
    isComplete,

    // Actions
    handleAnswerChange,
    handleCopyResults
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
