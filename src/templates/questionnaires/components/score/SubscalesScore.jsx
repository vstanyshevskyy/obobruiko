import React from 'react';
import { FaCopy as CopyIcon } from 'react-icons/fa';
import ReactMarkdown from '../../components/markdown';
import './index.less';

const SubscalesScore = ({
  results,
  copyButtonText,
  resultTemplate,
  onCopy
}) => {
  return (
    <div className="score">
      <div className="scoreComments">
        <ReactMarkdown>{resultTemplate.replace('{0}', results.join(', '))}</ReactMarkdown>
        
      </div>
      <button className="btn score__btn-copy" type="button" onClick={onCopy}>
        <CopyIcon />
        {copyButtonText}
      </button>
    </div>
  );
};

export default SubscalesScore;
