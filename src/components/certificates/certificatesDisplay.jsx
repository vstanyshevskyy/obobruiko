import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

export default ({ title, certificates }) => {
  const sliderSettings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  return (
    <div className="certificates">
      <h3 className="certificates__title">{title}</h3>
      <Slider {...sliderSettings}>
        {
          certificates.map(({ text, image }) => (
            <div key={image.relativePath}>
              <a href={`/assets/${image.relativePath}`} target="_blank" rel="noopener noreferrer">
                <Img alt={text} className="certificates__image" fluid={image.full.fluid} />
              </a>
              {
                text.trim()
                  ? <div className="certificates__text">{text}</div>
                  : false 
              }
            </div>
          ))
        }
      </Slider>
    </div>
  );
}