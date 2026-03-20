import React from 'react';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const Answer = ({ answer, questionId }) => {
  const { handleAnswerChange, hideAnswerValues } = useQuestionnaire();

  return (
    <>
      <input
        type="radio"
        id={answer.id}
        value={answer.value}
        name={questionId}
        defaultChecked={answer.defaultChecked}
        onChange={() => handleAnswerChange(questionId, answer.id)}
      />
      <label className="answer" htmlFor={answer.id}>
        {answer.text}
        {!hideAnswerValues && (
          <>
            {' '}
            <span className="answerValue">
              {answer.value ? '+' : ''}
              {answer.value}
            </span>
          </>
        )}
      </label>
    </>
  );
};

export default Answer;
