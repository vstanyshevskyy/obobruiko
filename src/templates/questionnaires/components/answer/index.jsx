import React from 'react';
import './index.less';

const Answer = ({
  id, value,
  questionId, defaultChecked, onChange, text, isSelected
}) => (
  <>
    <input
      type="radio"
      id={id}
      value={value}
      name={questionId}
      defaultChecked={defaultChecked}
      checked={isSelected}
      onChange={() => onChange(questionId, id)}
    />
    <label className="answer" htmlFor={id}>
      {text}
      {' '}
      <span className="answerValue">
        {(value) ? '+' : ''}
        {value}
      </span>
    </label>
  </>
);

export default Answer;
