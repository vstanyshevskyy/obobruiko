import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

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
    <GatsbyImage
      image={image.childImageSharp.gatsbyImageData}
      alt={imageAlt}
      className="hero__image"
    />
    <div className="hero__text-container">
      <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: text }} />
      <p className="hero__subtitle" dangerouslySetInnerHTML={{ __html: subtitle }} />
    </div>
  </div>
);
