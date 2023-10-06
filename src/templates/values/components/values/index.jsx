import React from 'react';
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
  const renderValue = value => {
    return (
      <Value
        key={value.id}
        text={value.text}
        name={value.name}
        id={value.id}
        hideAnswers={hideAnswers}
      />
    );
  };

  return (
    <div className="questionnaire">
      
      <p className="description">{description}</p>
      {instruction && <p className="instruction">{instruction}</p>}
      {values.map(value => renderValue(value))}
    </div>
  );
};

export default Values;
