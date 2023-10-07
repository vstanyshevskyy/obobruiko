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
      <label className="valueName">{name}</label>
      <label className="valueText">{text}</label>

      {!hideAnswers && <Answers questionId={id} />}
    </div>
  );
};


export default Value;
