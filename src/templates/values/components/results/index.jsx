import { Link } from 'gatsby';
import React, { useContext } from 'react';
import {
  FaPrint
} from 'react-icons/fa';
import LanguageContext from '../../../../context/LanguageContext';

import ValuesContext from '../../contexts/ValuesContext';
import Value from '../value';

import './index.less';

const Results = () => {
  const { values } = useContext(ValuesContext);
  const language = useContext(LanguageContext);
  const results = values.filter(o => o.selection === 'very_important');

  if (!results.length) {
    return null;
  }

  return (
    <div className="score">
      <h2 className="scoreValue">
        Ваші цінності
      </h2>
      <div className="scoreComments">
        {results.map(result => <Value hideAnswers key={`result-${result.id}`} text={result.text} name={result.name} id={0} />)}
      </div>

      <Link className="btn btn--light btn--print-results" to="/values-print" state={{ results, language }}>
        <FaPrint />
        Друк
      </Link>
    </div>
  );
};

export default Results;
