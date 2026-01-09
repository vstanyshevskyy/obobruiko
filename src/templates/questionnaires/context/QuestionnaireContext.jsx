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
      resultText: currentResult?.resultText || ''
    };
  }, [questions, scores, hasMultipleSubscalesFlag, subscaleResults, totalScore, currentResult]);

  // Copy results to clipboard
  const handleCopyResults = useCallback(e => {
    e.preventDefault();

    const state = getCurrentState();
    
    const questionsAnswers = state.questionsWithAnswers
      .map(q => `${q.questionText}\n   ${q.selectedAnswer.answerValue} = ${q.selectedAnswer.answerText}`)
      .join('\n');

    const copyText = copyResultsTemplate
      .replace('{0}', moment().format('DD.MM.YYYY'))
      .replace('{1}', state.totalScore)
      .replace('{2}', state.resultSummary)
      .replace('{3}', questionsAnswers);

    navigator.clipboard.writeText(copyText);
  }, [getCurrentState, questions, copyResultsTemplate]);

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
    handleCopyResults,
    getCurrentState
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
