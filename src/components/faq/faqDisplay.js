import React from 'react';
import './index.less';

export default ({
  title,
  subtitle,
  items = []
}) => (
  <div className="faq">
    <h3 className="faq__title">{title}</h3>
    <p className="faq__subtitle">{subtitle}</p>
    <dl className="faq__list">
      {
        items.map(({ question, answer }, index) => (
          <React.Fragment key={`faq-${index}`}>
            <dt className="faq__list-question">{ question }</dt>
            <dd className="faq__list-answer">{ answer }</dd>
          </React.Fragment>
        ))
      }
    </dl>
  </div>
);
