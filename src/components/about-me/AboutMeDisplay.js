import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from '../markdown';

import './index.less';

export default ({
  title,
  text,
  image,
  imageAlt,
  ctaText,
  ctaHref
}) => (
  <div className="about-me" id="about-me">
    <div className="about-me__text-outer">
      <div className="about-me__text">
        <div className="about-me__text-inner">
          <h3 className="about-me__title">{title}</h3>
          <div><ReactMarkdown source={text} /></div>
          <Link to={ctaHref} className="about-me__cta btn">{ctaText}</Link>
        </div>
      </div>
    </div>
    <Img alt={imageAlt} className="about-me__image" fluid={image.childImageSharp.fluid} />
  </div>
);
