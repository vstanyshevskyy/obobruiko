import React from 'react';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon, FaRedo as ResetIcon } from 'react-icons/fa';
import queryString from 'query-string';
import ReactMarkdown from '../../../../components/markdown';
import { useQuestionnaire } from '../../context/QuestionnaireContext';
import './index.less';

const SubscalesScore = ({
  results,
  copyButtonText,
  resultTemplate,
  bookConsultationButtonText,
  bookConsultationButtonLink,
  onCopy
}) => {
  const { clearScores } = useQuestionnaire();
  const qs = typeof window !== 'undefined' ? queryString.parse(window.location.search) : {};
  const isOpenupReferrer = qs.referrer?.toLowerCase() === 'openup';
  const isBookingButtonVisible = !isOpenupReferrer
    && bookConsultationButtonText
    && bookConsultationButtonLink;

  return (
    <div className="score">
      <div className="scoreComments">
        <ReactMarkdown>{resultTemplate.replace('{0}', results.join(', '))}</ReactMarkdown>
      </div>
      <div className="score__ctas">
        <button className="btn score__btn score__btn--copy" type="button" onClick={onCopy}>
          <CopyIcon />
          {copyButtonText}
        </button>
        <button className="btn score__btn score__btn--reset" type="button" onClick={clearScores}>
          <ResetIcon />
          Reset Test
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
