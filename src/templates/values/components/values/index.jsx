import React from 'react';
import ReactMarkdown from '../../../../components/markdown';

import Value from '../value';
import './index.less';

const Values = ({
  hideAnswers,
  data: {
    questionnaireName,
    description,
    instruction,
    values
  }
}) => {
  const renderValue = value => (
    <Value
      key={value.id}
      text={value.text}
      name={value.name}
      id={value.id}
      hideAnswers={hideAnswers}
    />
  );

  return (
    <div className="values">
      <div className="description"><ReactMarkdown>{description}</ReactMarkdown></div>
      {instruction && <p className="instruction">{instruction}</p>}
      {values.map(value => renderValue(value))}
    </div>
  );
};

export default Values;
