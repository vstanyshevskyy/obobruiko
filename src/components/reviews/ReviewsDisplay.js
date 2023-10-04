import React from 'react';
import './index.less';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default ({ reviews, title }) => {
  const sliderSettings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb slick-dots-white',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: true
  };
  return (
    <div className="review">
      {title ? <h3 className="services__title">{title}</h3> : null }
      <Slider {...sliderSettings}>
        {
          reviews.map(({ text, name }) => (
            <blockquote className="review__wrapper" key={text.substr(0, 10)}>
              <p className="review__text">{ text }</p>
              {
                name
                  ? <footer className="review__author">{ name }</footer>
                  : null
              }
            </blockquote>
          ))
        }
      </Slider>
    </div>
  );
};
