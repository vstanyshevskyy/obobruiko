import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import ReactMarkdown from '../markdown';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.less';

export default ({
  title,
  textBefore,
  textCertificates,
  textAfter,
  certificates
}) => {
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
      <div className="certificates__page-text certificates__page-text--before">
        <ReactMarkdown>{textBefore}</ReactMarkdown>
      </div>
      <div className="certificates__columns">
        <div className="certificates__column certificates__column--left">
          <ReactMarkdown>{textCertificates}</ReactMarkdown>
        </div>
        <div className="certificates__column certificates__column--right">
          <Slider {...sliderSettings}>
            {
              certificates.map(({ text, image }) => (
                <div key={image.relativePath}>
                  <a href={`/assets/${image.relativePath}`} target="_blank" rel="noopener noreferrer">
                    <Img alt={text} className="certificates__image" fluid={image.full.fluid} />
                  </a>
                </div>
              ))
            }
          </Slider>
          {
            title && <p className="certificates__title figcaption">{title}</p>
          }
        </div>
      </div>
      <div className="certificates__page-text certificates__page-text--after">
        <ReactMarkdown>{textAfter}</ReactMarkdown>
      </div>

    </div>
  );
};
