import React from 'react';
import { Link } from 'gatsby';
import queryString from 'query-string';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon, FaPrint as PrintIcon } from 'react-icons/fa';
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
  const qs = typeof window !== 'undefined' ? queryString.parse(window.location.search) : {};
  const isOpenupReferrer = qs.referrer?.toLowerCase() === 'openup';
  const isBookingButtonVisible = !isOpenupReferrer
    && bookConsultationButtonText
    && bookConsultationButtonLink;
  const getResult = () => {
    return results.find(result => score >= result.minScore && score <= result.maxScore);
  };
  const currentResult = getResult();
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
      {currentResult && currentResult.color && (<div className="score__result-line-color" style={{ backgroundColor: currentResult.color }} />)}
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
        {/* <Link target="_blank" className="btn score__btn score__btn--print" to={window.location.pathname + 'print'} state={{ results }}>
          <PrintIcon />
          Print
        </Link> */}
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
