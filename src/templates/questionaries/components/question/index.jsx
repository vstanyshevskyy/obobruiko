import React from 'react';
import Answers from '../answers';
import './index.css';

const Question = ({
  questionText,
  id,
  answers,
  onChange
}) => (
  <div className="question">
    <label className="questionText">{questionText}</label>
    <Answers questionId={id} answers={answers} onChange={onChange} />
  </div>
);

export default Question;
