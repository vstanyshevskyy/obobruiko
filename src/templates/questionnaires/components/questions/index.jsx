import React, { useState } from 'react';
import moment from 'moment/moment';
import Question from '../question';
import Score from '../score';
import './index.less';

const Questions = ({
  data: {
    questionnaireName,
    description,
    instruction,
    questions,
    resultTemplate,
    copyResultsTemplate,
    copyButtonText,
    results
  }
}) => {
  const [scores, setScores] = useState({});
  const score = Object.values(scores).reduce((a, b) => a + b, 0);

  const handleChange = (value, questionId) => {
    setScores({ ...scores, [questionId]: value || 0 });
  };

  const onCopy = e => {
    e.preventDefault();

    const questionsAnswers = questions.map((q, idx) => {
      const s = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.value === s) || q.answers[0];

      return `${idx + 1}. ${q.text}\n   ${selectedAnswer.value} = ${selectedAnswer.text}`;
    }).join('\n');

    const result = results.find(r => score >= r.minScore && score <= r.maxScore);

    const copyText = copyResultsTemplate
      .replace('{0}', moment().format('DD.MM.YYYY'))
      .replace('{1}', score)
      .replace('{2}', result.text || '')
      .replace('{3}', questionsAnswers);

    navigator.clipboard.writeText(copyText);
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
      <Score
        score={score}
        resultTemplate={resultTemplate}
        copyButtonText={copyButtonText}
        onCopy={onCopy}
        results={results}
      />
    </div>
  );
};

export default Questions;
