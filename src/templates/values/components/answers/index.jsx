import React, { useContext } from 'react';
import Answer from '../answer';
import './index.css';

import ValuesContext from '../../contexts/ValuesContext';

const Answers = ({
  questionId
}) => {
  const { options, valuesMap, onSelectionChange } = useContext(ValuesContext);

  function renderAnswer({ text, value, defaultChecked }) {
    return (
      <Answer
        key={`${questionId}-${value}`}
        id={`${questionId}-${value}`}
        questionId={questionId}
        value={value}
        text={text}
        defaultChecked={defaultChecked}
        onChange={onSelectionChange}
      />
    );
  }

  return (
    <div className="value-options">
      {Object.keys(options).map(o => renderAnswer({ text: options[o], value: o, defaultChecked: valuesMap[questionId].selection === o }))}
    </div>
  );
};

export default Answers;
