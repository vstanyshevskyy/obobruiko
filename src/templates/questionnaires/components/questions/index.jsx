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
    hasMultipleSubscalesFlag
  } = useQuestionnaire();

  const renderQuestion = question => {
    if (totalScore < (question.minScore || 0)) {
      return null;
    }

    return <Question key={question.id} question={question} />;
  };

  return (
    <div className="questionnaire">
      <h1 className="questionnaireName">{questionnaireName}</h1>
      <div className="questionnaireDatePrint">
        {new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' })}
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
      {hasMultipleSubscalesFlag ? <SubscalesScore /> : <Score />}
    </div>
  );
};

export default Questions;
