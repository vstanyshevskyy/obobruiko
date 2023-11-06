import React from 'react';
import './index.less';

const Score = ({ score, resultTemplate, results }) => {
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
    </div>
  );
};

export default Score;
