import React from 'react';
import queryString from 'query-string';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const Score = () => {
  const {
    totalScore,
    resultTemplate,
    results,
    currentResult,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    handleCopyResults
  } = useQuestionnaire();

  const qs = typeof window !== 'undefined' ? queryString.parse(window.location.search) : {};
  const isOpenupReferrer = qs.referrer?.toLowerCase() === 'openup';
  const isBookingButtonVisible = !isOpenupReferrer
    && bookConsultationButtonText
    && bookConsultationButtonLink;

  const renderResults = result => {
    if (totalScore >= result.minScore && totalScore <= result.maxScore) {
      return (
        <div key={result.id}>
          <ReactMarkdown>{result.text}</ReactMarkdown>
        </div>
      );
    }
    return null;
  };

  if (!totalScore) {
    return null;
  }

  return (
    <div className="score">
      {currentResult && currentResult.color && (
        <div className="score__result-line-color" style={{ backgroundColor: currentResult.color }} />
      )}
      <h2 className="scoreValue">
        <ReactMarkdown>{resultTemplate.replace('{0}', totalScore)}</ReactMarkdown>
      </h2>
      <div className="scoreComments">
        <p><strong>{currentResult?.resultSummary}</strong></p>
        {results.map(result => renderResults(result))}
      </div>
      <div className="score__ctas">
        <button className="btn score__btn score__btn--copy" type="button" onClick={handleCopyResults}>
          <CopyIcon />
          {copyButtonText}
        </button>
        {isBookingButtonVisible && (
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
