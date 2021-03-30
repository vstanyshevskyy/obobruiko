import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

export default ({ title, text, certificates }) => {
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
      <div class="certificates__column certificates__column--left">
        <ReactMarkdown source={text} />
      </div>
      <div class="certificates__column certificates__column--right">
        {
          title && <h3 className="certificates__title">{title}</h3>
        }
        <Slider {...sliderSettings}>
          {
            certificates.map(({ text, image }) => (
              <div key={image.relativePath}>
                <a href={`/assets/${image.relativePath}`} target="_blank" rel="noopener noreferrer">
                  <Img alt={text} className="certificates__image" fluid={image.full.fluid} />
                </a>
                <div className="certificates__text">{text}</div>
              </div>
            ))
          }
        </Slider>
      </div>
      
      
    </div>
  );
}