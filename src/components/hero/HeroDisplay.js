import React from 'react';
import Img from 'gatsby-image';
import './index.less';

export default ({
  image
}) => (
  <div className="hero">
    <Img alt="" className="hero__image" fluid={image.childImageSharp.fluid} />
  </div>
);
