import React, {
  createContext, useContext, useMemo, useState, useEffect
} from 'react';
import {
  calculateScore,
  groupScoresBySubscale,
  getSubscaleResults,
  hasMultipleSubscales as checkMultipleSubscales
} from '../utils/transformData';

const QuestionnaireContext = createContext(null);

export const QuestionnaireProvider = ({ children, data }) => {
  const storageKey = `questionnaire-${data.questionnaireName}`;

  // Initialize scores from localStorage or empty object
  const [scores, setScores] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  // Persist scores to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(scores));
    }
  }, [scores, storageKey]);

  const handleChange = (questionId, answerId) => {
    setScores(prevScores => ({ ...prevScores, [questionId]: answerId }));
  };

  const clearScores = () => {
    setScores({});
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey);
    }
  };

  const getSelectedAnswer = questionId => {
    const question = data.questions.find(q => q.id === questionId);
    if (!question) return null;

    const selectedAnswerId = scores[questionId];
    return question.answers.find(a => a.id === selectedAnswerId) || question.answers[0];
  };

  const getAllSelectedAnswers = () => data.questions.map(q => ({
    question: q,
    selectedAnswer: getSelectedAnswer(q.id)
  }));

  const score = useMemo(
    () => calculateScore(scores, data.questions),
    [scores, data.questions]
  );

  const hasMultipleSubscales = useMemo(
    () => checkMultipleSubscales(data.questions),
    [data.questions]
  );

  const subscaleScores = useMemo(
    () => groupScoresBySubscale(scores, data.questions),
    [scores, data.questions]
  );

  const subscaleResults = useMemo(
    () => getSubscaleResults(subscaleScores, data.results),
    [subscaleScores, data.results]
  );

  const value = useMemo(
    () => ({
      ...data,
      scores,
      setScores,
      handleChange,
      clearScores,
      getSelectedAnswer,
      getAllSelectedAnswers,
      score,
      hasMultipleSubscales,
      subscaleScores,
      subscaleResults
    }),
    [data, scores, score, hasMultipleSubscales, subscaleScores, subscaleResults]
  );

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
};

export default QuestionnaireContext;
