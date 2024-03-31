import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
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
          <div><ReactMarkdown>{text}</ReactMarkdown></div>
          <Link to={ctaHref} className="about-me__cta btn">{ctaText}</Link>
        </div>
      </div>
    </div>
    <GatsbyImage
      image={image.childImageSharp.gatsbyImageData}
      alt={imageAlt}
      className="about-me__image"
    />
  </div>
);
