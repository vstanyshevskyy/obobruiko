import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../../../context/LanguageContext';

import './index.less';

const Score = ({ score, results }) => {
  const {
    questionnairesSettings: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query ScoreQuery {
      questionnairesSettings: markdownRemark(frontmatter: {
        contentType: { eq: "questionnaires_settings" }
      }){
        frontmatter {
          content {
            language
            resultTemplate
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const { resultTemplate } = content.find(c => c.language === language) || defaultContent;

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
