import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from '../markdown';
import './index.less';

export default ({
  title: blockTitle,
  subtitle: blockSubtitle,
  services = []
}) => (
  <div className="services-list" id="services">
    <div className="services-list__inner">
      <h3 className="services__title">{blockTitle}</h3>
      {
        blockSubtitle
          ? <p className="services-list__subtitle">{blockSubtitle}</p>
          : null
      }
      {
        services.map(({
          title, text, image, linkText, link
        }, i) => (
          <div key={link || `service-${i}`} className="services-list__service">
            <div className={`services-list__service-image services-list__service-image--${i % 2 === 0 ? 'left' : 'right'}`}>
              <Img alt="" fluid={image.childImageSharp.fluid} />
            </div>
            <div className={`services-list__service-description services-list__service-description--${i % 2 === 0 ? 'right' : 'left'}`}>
              <div className="services-list__service-description-inner">
                <h4 className="services-list__title">
                  {title}
                </h4>
                <div className="services-list__service-text">
                  <ReactMarkdown source={text} />
                </div>
                {
                  link && linkText && <Link to={link} className="btn services-list__btn">{linkText}</Link>
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);
