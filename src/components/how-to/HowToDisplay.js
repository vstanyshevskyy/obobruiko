import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { FiMessageSquare, FiClock } from 'react-icons/fi';
import './index.less';

const icons = [
  <FiMessageSquare />,
  <FiClock />
];

export default ({
  title,
  steps = []
}) => (
  <div className="how-to" id="how-to">
    <h3 className="how-to__title">{title}</h3>
    <div className="how-to__content">
      <ul className="how-to__steps">
        {
          steps.map(({ title, text }, index) => (
            <li className="how-to__step">
              <div className="how-to__step-icon">
                {icons[index]}
              </div>
              <div className="how-to__step-content">
                <p className="how-to__step-title">{title}</p>
                <p className="how-to__step-text">{text}</p>
              </div>
              
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);
