import React from 'react';
import { FaCalendarAlt as CalendarIcon, FaDownload as DownloadIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import useQuestionnairePdfDownload from '../../pdf/useQuestionnairePdfDownload';
import './index.less';

function Score() {
  const {
    totalScore,
    resultTemplate,
    results,
    currentResult,
    language,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    isOpenupReferrer
  } = useQuestionnaire();
  const { downloadPdf, isGenerating } = useQuestionnairePdfDownload();

  const isBookingButtonVisible = (
    bookConsultationButtonText && (bookConsultationButtonLink || isOpenupReferrer)
  );

  const bookingUrl = isOpenupReferrer
    ? 'https://my.openup.com/book-session/olesia-bobruiko/session-type'
    : bookConsultationButtonLink;

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
        <button className="btn score__btn score__btn--print" type="button" onClick={downloadPdf} disabled={isGenerating}>
          <DownloadIcon />
          {isGenerating
            ? (language === 'EN' ? 'Preparing PDF...' : 'Готуємо PDF...')
            : (language === 'EN' ? 'Download PDF' : 'Зберегти PDF')}
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
}

export default Score;
