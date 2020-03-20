import React from 'react';
import Img from 'gatsby-image';
import './index.less';

export default ({
  image,
  imageAlt,
  text,
  buttonText,
  buttonHref
}) => (
  <div className="hero">
    <Img alt={imageAlt} className="hero__image" fluid={image.childImageSharp.fluid} />
    <div className="hero__text-container">
      <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: text }} />
      <a className="btn hero__button" href={`tel:${buttonHref}`}>{buttonText}</a>
    </div>
  </div>
);
