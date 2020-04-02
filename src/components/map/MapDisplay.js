import React from 'react';
import Img from 'gatsby-image';
import './index.less';

export default ({
  image,
  imageAlt,
  link,
  linkTitle
}) => (
  <div className="map">
    <a className="map__link" target="_blank" rel="noopener noreferrer" href={link} title={linkTitle}>
      <Img alt={imageAlt} className="map__image" fluid={image.childImageSharp.fluid} />
    </a>
  </div>
);
