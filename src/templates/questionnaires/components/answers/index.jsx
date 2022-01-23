import React from 'react';
import Answer from '../answer';
import './index.css';

const Answers = ({
  answers,
  questionId,
  onChange
}) => {
  function renderAnswer(answer) {
    return (
      <Answer
        key={answer.id}
        id={`${questionId}-${answer.id}`}
        questionId={questionId}
        value={answer.value}
        text={answer.text}
        defaultChecked={answer.defaultChecked}
        onChange={onChange}
      />
    );
  }

  return (
    <div className="answers">
      {answers.map(answer => renderAnswer(answer))}
    </div>
  );
};

export default Answers;
