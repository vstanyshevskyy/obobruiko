import React from 'react';
import Answer from '../answer';
import './index.less';

const Question = ({ question }) => (
  <div className="question">
    <label className="questionText">{question.questionText}</label>
    <div className="answers">
      {question.answers.map(answer => (
        <Answer key={answer.id} answer={answer} questionId={question.id} />
      ))}
    </div>
  </div>
);

export default Question;
