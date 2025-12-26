import React from 'react';
import { FaCopy as CopyIcon, FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import ReactMarkdown from '../../../../components/markdown';
import './index.less';

const SubscalesScore = ({
  results,
  copyButtonText,
  resultTemplate,
  bookConsultationButtonText,
  bookConsultationButtonLink,
  onCopy
}) => (
  <div className="score">
    <div className="scoreComments">
      <ReactMarkdown>{resultTemplate.replace('{0}', results.join(', '))}</ReactMarkdown>
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

export default SubscalesScore;
