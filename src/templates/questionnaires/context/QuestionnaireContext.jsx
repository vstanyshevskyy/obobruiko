import React, {
  createContext, useContext, useState, useMemo, useCallback, useEffect
} from 'react';
import { useReferrer } from '../../../hooks/useReferrer';
import {
  calculateTotalScore,
  getSubscaleResults,
  hasMultipleSubscales,
  prepareSubscaleResults
} from '../utils/scoring';

export const QuestionnaireContext = createContext(null);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within QuestionnaireProvider');
  }
  return context;
};

const getSymptomChecklistStorageKey = (language, questionnaireName) => (
  `questionnaire-symptom-checklist-${language}-${questionnaireName}`
);

export const QuestionnaireProvider = ({ children, data }) => {
  const {
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    symptomChecklist,
    questions,
    resultTemplate,
    copyResultsTemplate,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    language,
    hideAnswerValues
  } = data;

  const [scores, setScores] = useState({});
  const [checkedSymptoms, setCheckedSymptoms] = useState({});

  // Get referrer from URL
  const { referrer, isOpenupReferrer } = useReferrer();

  const symptomChecklistStorageKey = useMemo(
    () => getSymptomChecklistStorageKey(language, questionnaireName),
    [language, questionnaireName]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !symptomChecklist) {
      return undefined;
    }

    try {
      const saved = localStorage.getItem(symptomChecklistStorageKey);
      if (saved) {
        setCheckedSymptoms(JSON.parse(saved));
      } else {
        setCheckedSymptoms({});
      }
    } catch (error) {
      console.error('Error loading symptom checklist state:', error);
    }

    return undefined;
  }, [symptomChecklist, symptomChecklistStorageKey]);

  useEffect(() => {
    if (typeof window === 'undefined' || !symptomChecklist) {
      return undefined;
    }

    try {
      localStorage.setItem(symptomChecklistStorageKey, JSON.stringify(checkedSymptoms));
    } catch (error) {
      console.error('Error saving symptom checklist state:', error);
    }

    return undefined;
  }, [checkedSymptoms, symptomChecklist, symptomChecklistStorageKey]);

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

  // Remove an answer (used by checkbox-type questions when unchecking)
  const handleAnswerRemove = useCallback(questionId => {
    setScores(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  }, []);

  const handleSymptomToggle = useCallback(symptomId => {
    setCheckedSymptoms(prev => ({
      ...prev,
      [symptomId]: !prev[symptomId]
    }));
  }, []);

  const resetCheckedSymptoms = useCallback(() => {
    setCheckedSymptoms({});
  }, []);

  const selectedSymptoms = useMemo(() => {
    if (!symptomChecklist) {
      return [];
    }

    return symptomChecklist.sections.map(section => ({
      title: section.title,
      groups: section.groups.map(group => ({
        title: group.title,
        items: group.items.filter((item, index) => {
          const symptomId = `${section.title}-${group.title}-${item}-${index}`
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

          return Boolean(checkedSymptoms[symptomId]);
        })
      })).filter(group => group.items.length > 0)
    })).filter(section => section.groups.length > 0);
  }, [checkedSymptoms, symptomChecklist]);

  // Get current state of questionnaire
  const getCurrentState = useCallback(() => {
    const questionsWithAnswers = questions.map(q => {
      const selectedAnswerId = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId)
        || (q.type === 'checkbox' ? { id: null, text: 'No', value: 0 } : q.answers[0]);
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
    symptomChecklist,
    questions,
    resultTemplate,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    language,
    hideAnswerValues,
    selectedSymptoms,

    // State
    scores,
    checkedSymptoms,

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
    handleAnswerRemove,
    handleSymptomToggle,
    resetCheckedSymptoms,
    getCurrentState
  };

  return (
    <QuestionnaireContext.Provider value={value}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
