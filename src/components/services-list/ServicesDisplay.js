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
  title: blockTitle,
  subtitle: blockSubtitle,
  services = []
}) => {
  return (
    <div className="services-list">
      <h3 className="services__title">{blockTitle}</h3>
      <p className="services-list__subtitle">{blockSubtitle}</p>
      {
        services.map(({ title, subtitle, html, image }, i) => (
          <div key="title" className="services-list__service">
            <div className={`services-list__service-image services-list__service-image--${i % 2 === 0 ? 'left' : 'right'}`}>
              <Img alt="" fluid={image.childImageSharp.fluid} />
            </div>
            <div className={`services-list__service-description services-list__service-description--${i % 2 === 0 ? 'right' : 'left'}`}>
              <div className='services-list__service-description-inner'>
                <div className="services-list__title">
                  {title}
                </div>
                <div className="services-list__service-subtitle">
                  {subtitle}
                </div>
                <div className="services-list__service-text" dangerouslySetInnerHTML={{ __html: html }} />
                <button className="btn services-list__btn">Дізнатись більше</button>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}
