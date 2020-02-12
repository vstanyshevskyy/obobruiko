import React from 'react';
import Img from 'gatsby-image';
import './index.less';

export default ({
  title,
  content,
  image,
  imageAlt
}) => (
  <div className="about-me">
    <h3 className="about-me__title">{title}</h3>
    <div className="about-me__content">
      <p className="about-me__text" dangerouslySetInnerHTML={{ __html: content }} />
      <Img alt={imageAlt} className="about-me__image" fluid={image.childImageSharp.fluid} />
    </div>
  </div>
);
