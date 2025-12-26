import React from 'react';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import './index.less';

const Score = ({
  score,
  resultTemplate,
  results,
  copyButtonText,
  bookConsultationButtonText,
  bookConsultationButtonLink,
  onCopy
}) => {
  const renderResults = result => {
    if (score >= result.minScore && score <= result.maxScore) {
      return (
        <div key={result.id}>
          <ReactMarkdown>{result.text}</ReactMarkdown>
        </div>
      );
    }
    return null;
  };

  if (!score) {
    return null;
  }

  return (
    <div className="score">
      <h2 className="scoreValue">
        <ReactMarkdown>{resultTemplate.replace('{0}', score)}</ReactMarkdown>
      </h2>
      <div className="scoreComments">
        {results.map(result => renderResults(result))}
      </div>
      <div className="score__ctas">
        <button className="btn score__btn score__btn--copy" type="button" onClick={onCopy}>
          <CopyIcon />
          {copyButtonText}
        </button>
        {bookConsultationButtonText && bookConsultationButtonLink && (
          <a href={bookConsultationButtonLink} className="btn score__btn score__btn--book">
            <CalendarIcon />
            {bookConsultationButtonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Score;
