import React from 'react';
import Answer from '../answer';
import './index.css';

const Answers = ({ question }) => (
  <div className="answers">
    {question.answers.map(answer => (
      <Answer key={answer.id} answer={answer} questionId={question.id} />
    ))}
  </div>
);

export default Answers;
