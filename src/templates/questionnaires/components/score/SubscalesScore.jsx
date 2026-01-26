import React from 'react';
import { FaCalendarAlt as CalendarIcon, FaDownload as DownloadIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { prepareSubscaleResults } from '../../utils/scoring';
import './index.less';

const SubscalesScore = () => {
  const {
    subscaleResults,
    resultTemplate,
    language,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    isOpenupReferrer
  } = useQuestionnaire();

  const handlePrint = () => {
    window.print();
  };

  const isBookingButtonVisible = bookConsultationButtonText && (bookConsultationButtonLink || isOpenupReferrer);
  
  const bookingUrl = isOpenupReferrer 
    ? 'https://my.openup.com/book-session/olesia-bobruiko/session-type'
    : bookConsultationButtonLink;

  const formattedResults = prepareSubscaleResults(subscaleResults);

  return (
    <div className="score">
      <div className="scoreComments">
        <ReactMarkdown>{resultTemplate.replace('{0}', formattedResults.join(', '))}</ReactMarkdown>
      </div>
      <div className="score__ctas">
        <button className="btn score__btn score__btn--print" type="button" onClick={handlePrint}>
          <DownloadIcon />
          {language === 'EN' ? 'Download PDF' : 'Зберегти PDF'}
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

export default SubscalesScore;
