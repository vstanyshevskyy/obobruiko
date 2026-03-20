import React from 'react';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const CheckboxQuestion = ({ question }) => {
  const { scores, handleAnswerChange, handleAnswerRemove } = useQuestionnaire();

  const isChecked = !!scores[question.id];
  const answer = question.answers[0]; // The "Yes / happened" answer

  const toggle = () => {
    if (isChecked) {
      handleAnswerRemove(question.id);
    } else {
      handleAnswerChange(question.id, answer.id);
    }
  };

  return (
    <div
      className={`checkboxQuestion${isChecked ? ' checkboxQuestion--checked' : ''}`}
      onClick={toggle}
      role="checkbox"
      aria-checked={isChecked}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <span className="checkboxQuestion__box" aria-hidden="true">
        {isChecked && (
          <svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="checkboxQuestion__text">{question.questionText}</span>
      <span className="checkboxQuestion__value">+{answer.value}</span>
    </div>
  );
};

export default CheckboxQuestion;
