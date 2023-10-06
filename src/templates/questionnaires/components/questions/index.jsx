import React, { useState } from 'react';
import Question from '../question';
import Score from '../score';
import './index.less';

const Questions = ({
  data: {
    questionnaireName,
    description,
    instruction,
    questions,
    results
  }
}) => {
  const [scores, setScores] = useState({});
  const score = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleChange = (value, questionId) => {
    setScores({ ...scores, [questionId]: value || 0 });
  };

  const renderQuestion = question => {
    if (score < (question.minScore || 0)) {
      return null;
    }

    return (
      <Question
        key={question.id}
        questionText={question.questionText}
        answers={question.answers}
        id={question.id}
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="questionnaire">
      <h2 className="questionnaireName">{questionnaireName}</h2>
      <p className="description">{description}</p>
      <p className="instruction">{instruction}</p>
      {questions.map(question => renderQuestion(question))}
      <Score score={score} results={results} />
    </div>
  );
};

export default Questions;
