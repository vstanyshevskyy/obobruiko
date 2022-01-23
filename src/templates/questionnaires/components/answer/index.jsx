import React from 'react';
import './index.css';

const Answer = ({
  id, value,
  questionId, defaultChecked, onChange, text
}) => (
  <>
    <input
      type="radio"
      id={id}
      value={value}
      name={questionId}
      defaultChecked={defaultChecked}
      onChange={() => onChange(value, questionId)}
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
