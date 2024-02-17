import React from 'react';
import { FaCopy as CopyIcon } from 'react-icons/fa';
import './index.less';

const Score = ({
  score,
  resultTemplate,
  results,
  copyButtonText,
  onCopy 
}) => {
  const renderResults = result => {
    if (score >= result.minScore && score <= result.maxScore) {
      return <p key={result.id}>{result.text}</p>;
    }
    return null;
  };

  return (
    <div className="score">
      <h2 className="scoreValue">
        {resultTemplate.replace('{0}', score)}
      </h2>
      <div className="scoreComments">
        {results.map(result => renderResults(result))}
      </div>
      <button className="btn score__btn-copy" type="button" onClick={onCopy}>
        <CopyIcon />
        {copyButtonText}
      </button>
    </div>
  );
};

export default Score;
