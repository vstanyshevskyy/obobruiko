import React from 'react';
import moment from 'moment/moment';
import ReactMarkdown from '../../../../components/markdown';
import Question from '../question';
import Score from '../score';
import SubscalesScore from '../score/SubscalesScore';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const Questions = () => {
  const {
    questionnaireName,
    description,
    instruction,
    contentAfterInstructions,
    questions,
    resultTemplate,
    copyResultsTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    results,
    scores,
    handleChange,
    score,
    hasMultipleSubscales,
    subscaleScores,
    subscaleResults
  } = useQuestionnaire();

  const prepareSubscaleResults = r => {
    return Object.keys(r).map(key => `${key}: ${r[key].score} (${r[key].text})`);
  };

  const onCopy = e => {
    e.preventDefault();

    const questionsAnswers = questions.map(q => {
      const selectedAnswerId = scores[q.id];
      const selectedAnswer = q.answers.find(a => a.id === selectedAnswerId) || q.answers[0];

      return `${q.text}\n   ${selectedAnswer.value} = ${selectedAnswer.text}`;
    }).join('\n');

    const result = results.find(r => score >= r.minScore && score <= r.maxScore);

    const copyText = copyResultsTemplate
      .replace('{0}', moment().format('DD.MM.YYYY'))
      .replace('{1}', hasMultipleSubscales ? prepareSubscaleResults(subscaleResults).join(', ') : score)
      .replace('{2}', result?.text || '')
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
      <h1 className="questionnaireName">{questionnaireName}</h1>
      <p className="description">
        <ReactMarkdown>{description}</ReactMarkdown>
      </p>
      {
        instruction && (
          <p className="instruction">
            <ReactMarkdown>{instruction}</ReactMarkdown>
          </p>
        )
      }
      {
        contentAfterInstructions && (
          <div className="contentAfterInstructions">
            <ReactMarkdown>{contentAfterInstructions}</ReactMarkdown>
          </div>
        )
      }
      {questions.map(question => renderQuestion(question))}
      {hasMultipleSubscales
        ? (
          <SubscalesScore
            resultTemplate={resultTemplate}
            results={prepareSubscaleResults(subscaleResults)}
            copyButtonText={copyButtonText}
            bookConsultationButtonText={bookConsultationButtonText}
            bookConsultationButtonLink={bookConsultationButtonLink}
            onCopy={onCopy}
          />
        )
        : (
          <Score
            score={score}
            resultTemplate={resultTemplate}
            copyButtonText={copyButtonText}
            bookConsultationButtonText={bookConsultationButtonText}
            bookConsultationButtonLink={bookConsultationButtonLink}
            onCopy={onCopy}
            results={results}
          />
        )
      }

    </div>
  );
};

export default Questions;
