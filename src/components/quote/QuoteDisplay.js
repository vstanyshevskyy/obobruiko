import React from 'react';
import './index.less';

export default ({
  text,
  author
}) => (
  <blockquote className="quote">
    <p className="quote__text">{ text }</p>
    {
      author
        ? <footer className="quote__author">{ author }</footer>
        : null
    }
  </blockquote>
);
