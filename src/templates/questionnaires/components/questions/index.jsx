import React from 'react';
import ReactMarkdown from '../../../../components/markdown';
import Question from '../question';
import Score from '../score';
import SubscalesScore from '../score/SubscalesScore';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const Questions = () => {
  const {
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    totalScore,
    hasMultipleSubscalesFlag,
    language
  } = useQuestionnaire();

  const renderQuestion = question => {
    if (totalScore < (question.minScore || 0)) {
      return null;
    }

    return <Question key={question.id} question={question} />;
  };

  const locale = language === 'EN' ? 'en-US' : 'uk-UA';

  return (
    <div className="questionnaire">
      <h1 className="questionnaireName">{questionnaireName}</h1>
      <div className="questionnaire__header-print">
        <div className="questionnaire__date-print">
          {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div className="questionnaire__score-print">
          {hasMultipleSubscalesFlag ? <SubscalesScore /> : <Score />}
        </div>
      </div>
      <p className="description">
        <ReactMarkdown>{description}</ReactMarkdown>
      </p>
      {instruction && (
        <p className="instruction">
          <ReactMarkdown>{instruction}</ReactMarkdown>
        </p>
      )}
      {contentAfterInstructions && (
        <div className="contentAfterInstructions">
          <ReactMarkdown>{contentAfterInstructions}</ReactMarkdown>
        </div>
      )}
      {questions.map(question => renderQuestion(question))}
      <div className="questionnaire__score-screen">
        {hasMultipleSubscalesFlag ? <SubscalesScore /> : <Score />}
      </div>
    </div>
  );
};

export default Questions;
