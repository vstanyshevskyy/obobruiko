import React from 'react';
import './index.less';

export default ({
  text,
  author
}) => (
  <blockquote className="quote">
    <p className="quote__text">{ text }</p>
    <footer className="quote__author">{ author }</footer>
  </blockquote>
);
