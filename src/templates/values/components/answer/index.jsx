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
      onChange={() => onChange({ questionId, value })}
    />
    <label className="answer" htmlFor={id}>
      {text}
    </label>
  </>
);

export default Answer;
