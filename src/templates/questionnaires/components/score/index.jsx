import React from 'react';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon, FaDownload as DownloadIcon } from 'react-icons/fa';
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
    language,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    handleCopyResults,
    isOpenupReferrer
  } = useQuestionnaire();

  const isBookingButtonVisible = bookConsultationButtonText && (bookConsultationButtonLink || isOpenupReferrer);
  
  const bookingUrl = isOpenupReferrer 
    ? 'https://my.openup.com/book-session/olesia-bobruiko/session-type'
    : bookConsultationButtonLink;

  const handlePrint = () => {
    window.print();
  };

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
        <button className="btn score__btn score__btn--print" type="button" onClick={handlePrint}>
          <DownloadIcon />
          {language === 'EN' ? 'Download PDF' : 'Зберегти PDF'}
        </button>
        <button className="btn score__btn score__btn--copy" type="button" onClick={handleCopyResults}>
          <CopyIcon />
          {copyButtonText}
        </button>
        {isBookingButtonVisible && (
          <a href={bookingUrl} className="btn score__btn score__btn--book">
            <CalendarIcon />
            {bookConsultationButtonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Score;
