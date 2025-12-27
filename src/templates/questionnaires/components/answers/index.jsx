import React from 'react';
import Answer from '../answer';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.css';

const Answers = ({
  answers,
  questionId,
  onChange
}) => {
  const { scores } = useQuestionnaire();
  
  function renderAnswer(answer) {
    const isSelected = scores[questionId] === answer.id;
    
    return (
      <Answer
        key={answer.id}
        id={answer.id}
        questionId={questionId}
        value={answer.value}
        text={answer.text}
        defaultChecked={answer.defaultChecked}
        isSelected={isSelected}
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
