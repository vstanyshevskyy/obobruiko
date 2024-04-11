import React, { useState } from 'react';
import moment from 'moment/moment';
import Question from '../question';
import Score from '../score';
import SubscalesScore from '../score/SubscalesScore';
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

  const scales = questions.map(q => q.subscale);
  const uniqueSubscales = [...new Set(scales)];
  const hasMultipleSubscales = uniqueSubscales.length > 1;

  const groupScoresBySubscale = () => {
    const scoresBySubscale = {};
    questions.forEach(q => {
      scoresBySubscale[q.subscale] = scoresBySubscale[q.subscale] || 0;
      scoresBySubscale[q.subscale] += scores[q.id] || 0;
    });
    return scoresBySubscale;
  };

  const getSubscaleResults = () => {
    const scoresBySubscale = groupScoresBySubscale();
    const subscaleResults = {};
    Object.keys(scoresBySubscale).forEach(subscale => {
      const result = results.find(r => r.subscale === subscale && scoresBySubscale[subscale] >= r.minScore && scoresBySubscale[subscale] <= r.maxScore);
      subscaleResults[subscale] = { score: scoresBySubscale[subscale], text: result.text };
    });
    return subscaleResults;
  };

  const handleChange = (value, questionId) => {
    setScores({ ...scores, [questionId]: value || 0 });
  };

  const prepareSubscaleResults = r => {
    return Object.keys(r).map(key => `${key}: ${r[key].score} (${r[key].text})`);
  };

  const onCopy = e => {
    e.preventDefault();

    const questionsAnswers = questions.map(q => {
      const s = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.value === s) || q.answers[0];

      return `${q.text}\n   ${selectedAnswer.value} = ${selectedAnswer.text}`;
    }).join('\n');

    const result = results.find(r => score >= r.minScore && score <= r.maxScore);

    const copyText = copyResultsTemplate
      .replace('{0}', moment().format('DD.MM.YYYY'))
      .replace('{1}', hasMultipleSubscales ? prepareSubscaleResults(getSubscaleResults()).join(', ') : score) // TODO
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
      {hasMultipleSubscales
        ? (
          <SubscalesScore
            resultTemplate={resultTemplate}
            results={prepareSubscaleResults(getSubscaleResults())}
            copyButtonText={copyButtonText}
            onCopy={onCopy}
          />
        )
        : (
          <Score
            score={score}
            resultTemplate={resultTemplate}
            copyButtonText={copyButtonText}
            onCopy={onCopy}
            results={results}
          />
        )
      }

    </div>
  );
};

export default Questions;
