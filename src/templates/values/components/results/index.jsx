import { Link, useStaticQuery, graphql } from 'gatsby';
import React, { useContext } from 'react';
import {
  FaPrint
} from 'react-icons/fa';

import ValuesContext from '../../contexts/ValuesContext';
import Value from '../value';
import ReactMarkdown from '../../../../components/markdown';


import './index.less';

const Results = ({ language }) => {
  const {
    resultsConfig: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
    query ValuesResultsQuery {
      resultsConfig: markdownRemark(
        frontmatter: {
          contentType: { eq: "values" }
        }
      ) {
        frontmatter {
          content {
            language
            printText
            resultsHeading
            resultsDescription
          }
        }
      }
    }
  `);

  const {
    printText,
    resultsHeading,
    resultsDescription
  } = content.find(c => c.language === language);

  const { values } = useContext(ValuesContext);
  const results = values.filter(o => o.selection === 'very_important');

  if (!results.length) {
    return null;
  }

  return (
    <div className="score score--values">
      <h2 className="scoreValue">
        {resultsHeading}
      </h2>

      <div><ReactMarkdown source={resultsDescription} /></div>

      <div className="scoreComments">
        {results.map(result => <Value hideAnswers key={`result-${result.id}`} text={result.text} name={result.name} id={0} />)}
      </div>

      {/* <Link target="_blank" className="btn btn--light btn--print-results" to="/values-print" state={{ results, language }}>
        <FaPrint />
        {printText}
      </Link> */}
    </div>
  );
};

export default Results;


