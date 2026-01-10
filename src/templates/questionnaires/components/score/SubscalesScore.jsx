import React from 'react';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import { prepareSubscaleResults } from '../../utils/scoring';
import './index.less';

const SubscalesScore = () => {
  const {
    subscaleResults,
    resultTemplate,
    copyButtonText,
    bookConsultationButtonText,
    bookConsultationButtonLink,
    handleCopyResults,
    isOpenupReferrer
  } = useQuestionnaire();

  const isBookingButtonVisible = !isOpenupReferrer
    && bookConsultationButtonText
    && bookConsultationButtonLink;

  const formattedResults = prepareSubscaleResults(subscaleResults);

  return (
    <div className="score">
      <div className="scoreComments">
        <ReactMarkdown>{resultTemplate.replace('{0}', formattedResults.join(', '))}</ReactMarkdown>
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

export default SubscalesScore;
