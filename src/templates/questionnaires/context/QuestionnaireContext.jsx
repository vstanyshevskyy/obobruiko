import React, {
  createContext, useContext, useState, useMemo, useCallback
} from 'react';
import moment from 'moment/moment';
import queryString from 'query-string';
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
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    language
  } = data;

  const [scores, setScores] = useState({});

  // Get referrer from URL
  const referrer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const qs = queryString.parse(window.location.search);
    return qs.referrer || null;
  }, []);

  const isOpenupReferrer = useMemo(
    () => referrer?.toLowerCase() === 'openup',
    [referrer]
  );

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

  // Get current state of questionnaire
  const getCurrentState = useCallback(() => {
    const questionsWithAnswers = questions.map(q => {
      const selectedAnswerId = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId) || q.answers[0];
      return {
        questionId: q.id,
        questionText: q.text,
        selectedAnswer: {
          answerId: selectedAnswer.id,
          answerText: selectedAnswer.text,
          answerValue: selectedAnswer.value
        }
      };
    });

    const scoreText = hasMultipleSubscalesFlag
      ? prepareSubscaleResults(subscaleResults).join(', ')
      : totalScore.toString();

    return {
      totalScore: scoreText,
      questionsWithAnswers,
      resultSummary: currentResult?.resultSummary || '',
      resultText: currentResult?.text || ''
    };
  }, [questions, scores, hasMultipleSubscalesFlag, subscaleResults, totalScore, currentResult]);

  const value = {
    // Static data
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    resultTemplate,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    language,

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
    referrer,
    isOpenupReferrer,

    // Actions
    handleAnswerChange,
    getCurrentState
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
