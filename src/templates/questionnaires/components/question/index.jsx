import React from 'react';
import Answers from '../answers';
import './index.less';

const Question = ({ question }) => (
  <div className="question">
    <label className="questionText">{question.questionText}</label>
    <Answers question={question} />
  </div>
);

export default Question;
