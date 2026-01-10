import React, { useState, useEffect } from 'react';
import { Link, withPrefix } from 'gatsby';
import classNames from 'classnames';
import {
  FaBars, FaTimes
} from 'react-icons/fa';

import SocialIcons from '../social-icons';
import './index.less';

function debounce(func, wait, immediate) {
  let timeout;
  return function(...args) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export default props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handler = debounce(() => {
      setIsScrolled(window.scrollY > 0);
    }, 50);
    window.addEventListener('scroll', handler);
    return function cleanUp() {
      window.removeEventListener('scroll', handler);
    };
  });
  
  const {
    className, links = [], socialIcons, isImageFullscreen = false, ctaText, ctaLink, slogan, logoText, homeLink, useWhiteForNav = false
  } = props;
  
  // Check for OpenUp referrer
  const isOpenupReferrer = typeof window !== 'undefined' 
    && new URLSearchParams(window.location.search).get('referrer')?.toLowerCase() === 'openup';
  
  const finalCtaLink = isOpenupReferrer 
    ? 'https://my.openup.com/book-session/olesia-bobruiko/session-type'
    : ctaLink;
  
  const navClasses = classNames('nav', {
    'nav--expanded': isOpen,
    'nav--custom': className,
    'nav--scrolled': isScrolled,
    'nav--white': useWhiteForNav,
    'nav--visible': !isImageFullscreen
  });
  return (
    <nav className={navClasses}>
      <div className="nav__inner">
        <div className="nav__logo">
          <Link to={homeLink} className="nav__logo-link">{logoText}</Link>
          <span className="nav__logo-sub">{slogan}</span>
        </div>
        <ul className="nav__menu" id="nav__menu">
          {links.map(({ url, text }) => (
            <li className="nav__menu-item" key={url}>
              <Link className="nav__menu-link" activeClassName="nav__menu-link nav__menu-link--current" to={url}>{text}</Link>
            </li>
          ))}
          <li className="nav__menu-item">
            <a type="button" className="btn nav__cta" href={finalCtaLink}>{ctaText}</a>
          </li>
        </ul>
        {/* <SocialIcons
          listItemClassName="nav__social-icons-item"
          linkClassName={classNames('nav__social-icons-item-link')}
          listClassName="nav__social-icons"
          icons={socialIcons}
        /> */}
      </div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="nav__burger-btn"
        aria-label="Відкрити навігацію"
        aria-expanded={isOpen}
        aria-controls="nav__menu"
      >
        { isOpen ? <FaTimes /> : <FaBars /> }
      </button>
    </nav>
  );
};
