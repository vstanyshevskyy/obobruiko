import React from 'react';
import './index.less';

export default ({
  title,
  steps = []
}) => (
  <div className="how-to" id="how-to">
    <h3 className="how-to__title">{title}</h3>
    <div className="how-to__content">
      <ul className="how-to__steps">
        {
          steps.map(({ title: stepTitle, text, icon }, index) => (
            <li className="how-to__step" key={`step-${index}`}>
              <div className="how-to__step-icon">
                <img className="how-to__step-icon-img" src={`/assets/${icon.relativePath}`} alt="" />
              </div>
              <div className="how-to__step-content">
                <p className="how-to__step-title">{stepTitle}</p>
                <p className="how-to__step-text">{text}</p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);
