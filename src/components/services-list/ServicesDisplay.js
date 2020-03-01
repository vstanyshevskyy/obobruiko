import React from 'react';
import Slider from 'react-slick';
import Img from 'gatsby-image';
import './index.less';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 10000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true
};

export default ({
  title,
  subtitle,
  services = []
}) => {
  return (
    <div className="services-list">
      <h3 className="services-list__title">{title}</h3>
      <p className="services-list__subtitle">{subtitle}</p>
      <div className="services-list__slider">
        <Slider {...settings}>
          {services.map(({ title, subtitle, html, image }) => (
            <div className="services-list__slide" key={title}>
              <Img alt="" fluid={image.childImageSharp.fluid} />
              <div className="services-list__slide-title">
                {title}
              </div>
              <div className="services-list__slide__text-container">
                <div className="services-list__slide__text-wrapper">
                  <div className="services-list__slide-subtitle">
                    {subtitle}
                  </div>
                  <div className="services-list__slide-text" dangerouslySetInnerHTML={{ __html: html }} />
                  <button className='btn services-list__btn'>Записатись на консультацію</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
