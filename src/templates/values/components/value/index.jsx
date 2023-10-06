import React from 'react';
import Answers from '../answers';
import './index.less';

const Value = ({
  text,
  name,
  id,
  hideAnswers
} = { hideAnswers: false }) => {
  return (
    <div className="question">
      <label className="questionText">{name}</label>
      <label className="questionText">{text}</label>

      {!hideAnswers && <Answers questionId={id} />}
    </div>
  );
};


export default Value;
