import React from 'react';

import { FaMapMarkerAlt, FaRegEnvelope, FaPhone } from 'react-icons/fa';
import SocialIcons from '../social-icons';
import './index.less';

const resetCookies = () => {
  localStorage.setItem('cookieConsent', 'false');
  window.location.reload();
  document.cookie = 'CookieConsent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

const Footer = ({
  contactDetails: {
    title,
    address,
    email,
    emailText,
    phone,
    phoneText
  }, copyrightText, links
}) => (
  <footer className="footer-container">
    <div className="row">
      <div className="column contact-column" id="contact">
        <h3>{title}</h3>
        <p>
          <FaMapMarkerAlt />
          {address}
        </p>
        <p>
          <FaRegEnvelope />
          <a href={`mailto:${email}`}>{emailText}</a>
        </p>
        <p>
          <FaPhone />
          <a href={`tel:${phone}`}>{phoneText}</a>
        </p>
      </div>
      <div className="column social-icons-column">
        <SocialIcons
          listClassName="social-icons-container"
          listItemClassName="social-icons-item"
          icons={[
            { type: 'Facebook', url: 'https://www.facebook.com/psychologist.olesya.bobruyko' },
            { type: 'Instagram', url: 'https://www.instagram.com/olesya.bobruyko/' },
            { type: 'Skype', url: 'https://join.skype.com/invite/mwn1okh3jRcF' },
            { type: 'Mail', url: 'mailto:psychologist.olesya.b@gmail.com' },
            { type: 'Youtube', url: 'https://www.youtube.com/channel/UCax4hKxA_XE-rkvVFI4UJQQ' }
          ]}
        />
      </div>
    </div>
    <div className="footer__extra-links">
      <ul className="footer__extra-links-list">
        {
          links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                onClick={e => {
                  if (link.url === '/cookie-preferences') {
                    e.preventDefault();
                    resetCookies();
                  }
                }}
              >
                {link.text}
              </a>
            </li>
          ))
        }
      </ul>
    </div>
    <div className="copyright-row">
      <svg className="copyright-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path className="copyright-wave-path" d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z" />
      </svg>
      <div className="copyright-text">
        {copyrightText}
      </div>
    </div>
  </footer>
);

export default Footer;
