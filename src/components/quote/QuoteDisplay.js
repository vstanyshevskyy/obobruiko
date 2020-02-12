import React from 'react';
import './index.less';

export default ({
  quote,
  author
}) => (
  <blockquote className="quote">
    <p className="quote__text">{ quote }</p>
    <footer className="quote__author">{ author }</footer>
  </blockquote>
);
