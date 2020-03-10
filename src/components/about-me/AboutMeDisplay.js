import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './index.less';

export default ({
  title,
  content,
  image,
  imageAlt
}) => (
  <div className="about-me">
    <div className="about-me__text-outer">
      <div className="about-me__text">
        <div className="about-me__text-inner">
          <h3 className="about-me__title">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <Link to="/" className="about-me__cta btn">Дізнатися більше про мене</Link>
        </div>
      </div>
    </div>
    <Img alt={imageAlt} className="about-me__image" fluid={image.childImageSharp.fluid} />
  </div>
);
