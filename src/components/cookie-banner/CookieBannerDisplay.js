import React from 'react';
import CookieConsent from 'react-cookie-consent';
import './index.less';

const CookieBanner = ({
  text,
  acceptButtonText,
  declineButtonText,
  linkText,
  linkUrl
}) => (
  <CookieConsent
    location="bottom"
    disableStyles
    buttonClasses="btn"
    containerClasses="cookie-consent"
    declineButtonClasses="btn btn--light"
    buttonWrapperClasses="cookie-consent__button-wrapper"
    contentClasses="cookie-consent__text"
    buttonText={acceptButtonText}
    enableDeclineButton
    declineButtonText={declineButtonText}
    onAccept={() => {
      localStorage.setItem('cookieConsent', 'true');
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('config', 'G-QFJWES2R7M', { send_page_view: true });
    }}
    onDecline={() => {
      localStorage.setItem('cookieConsent', 'false');
      window.location.reload();
    }}
  >
    {text}&nbsp;
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      [
      {linkText}
      ]
    </a>
  </CookieConsent>
);

export default CookieBanner;
