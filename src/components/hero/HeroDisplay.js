import React from 'react';
import Img from 'gatsby-image';
import './index.less';

export default ({
  image,
  title,
  subtitle,
  buttonText,
  telephoneNumber
}) => (
  <div className="hero">
    <Img alt="" className="hero__image" fluid={image.childImageSharp.fluid} />
    {/* <Img alt="" className="hero__image_fixed" fixed={image.childImageSharp.fixed} /> */}
    <div className="hero__text-container">
      <h1 className="hero__title" dangerouslySetInnerHTML={{ __html: title }} />
      {/* <p className="hero__subtitle">{subtitle}</p> */}
      <a className="btn btn--primary hero__button" href={`tel:${telephoneNumber}`}>{buttonText}</a>
    </div>
  </div>
);
