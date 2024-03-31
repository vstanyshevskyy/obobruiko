import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import './index.less';

export default ({
  image,
  imageAlt,
  link,
  linkTitle
}) => (
  <div className="map">
    <a className="map__link" target="_blank" rel="noopener noreferrer" href={link} title={linkTitle}>
      <GatsbyImage
        image={image.childImageSharp.gatsbyImageData}
        alt={imageAlt}
        className="map__image"
      />
    </a>
  </div>
);
