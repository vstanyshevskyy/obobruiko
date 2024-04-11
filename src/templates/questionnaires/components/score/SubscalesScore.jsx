import React from 'react';
import { FaCopy as CopyIcon } from 'react-icons/fa';
import './index.less';

const SubscalesScore = ({
  results,
  copyButtonText,
  onCopy
}) => {
  return (
    <div className="score">
      <div className="scoreComments">
        {resultTemplate.replace('{0}', results.map(res => (<p>{res}</p>)))}
      </div>
      <button className="btn score__btn-copy" type="button" onClick={onCopy}>
        <CopyIcon />
        {copyButtonText}
      </button>
    </div>
  );
};

export default SubscalesScore;
