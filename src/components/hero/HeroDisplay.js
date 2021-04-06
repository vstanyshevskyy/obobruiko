import React from 'react';
import Img from 'gatsby-image';

import './index.less';

export default ({
  image,
  imageAlt,
  text,
  subtitle,
  buttonText,
  buttonHref
}) => (
  <div className="hero">
    <Img alt={imageAlt} className="hero__image" fluid={image.childImageSharp.fluid} />
    <div className="hero__text-container">
      <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: text }} />
      <p className="hero__subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
  </div>
);
