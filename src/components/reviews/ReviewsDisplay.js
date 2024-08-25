import React from 'react';
import './index.less';

import Slider from 'react-slick';
import moment from 'moment';
import { GatsbyImage } from 'gatsby-plugin-image';
import ReactMarkdown from '../markdown';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getSocialIcon } from '../social-icons';

export default ({ reviews, title }) => {
  const sliderSettings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb slick-dots-white',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };
  return (
    <div className="review">
      {title ? <h3 className="reviews__title">{title}</h3> : null}
      <Slider {...sliderSettings}>
        {reviews.map(({ text, author, source, date }) => (
          <blockquote className="review__wrapper" key={text.substr(0, 10)}>
            <ReactMarkdown className="review__text">{text}</ReactMarkdown>
            <footer className="review__author">
              {author && author.image ? (
                <GatsbyImage
                  image={author.image.childImageSharp.gatsbyImageData}
                  alt={author.name}
                  className="review__author-image"
                />
              ) : null}
              <div className="review__author-sideinfo">
                {author.name ? (
                  <p className="review__author-name">{author.name}</p>
                ) : null}
                {author.title ? (
                  <p className="review__author-details">{author.title}</p>
                ) : null}
                {author.location ? (
                  <p className="review__author-details">{author.location}</p>
                ) : null}
                {date ? (
                  <p className="review__date">
                    {moment(date, 'DD.MM.YYYY').format('DD MMMM YYYY')}
                    {source ? (
                      <>
                        &nbsp;|&nbsp;
                        <a
                          className="review__source-link"
                          href={source.url}
                          target="__blank"
                        >
                          {getSocialIcon(source.socialIcon)}
                          {source.text}
                        </a>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </footer>
          </blockquote>
        ))}
      </Slider>
    </div>
  );
};
