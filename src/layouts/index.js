import React from 'react';
import Helmet from 'react-helmet';
import { Location } from '@reach/router';
import CookieConsent from 'react-cookie-consent';

import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import LanguageContext from '../context/LanguageContext';

import '../components/styleguide/index.less';
import './index.less';

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPageBlurred: false
    };
    this.blurPage = this.blurPage.bind(this);
  }

  blurPage() {
    this.setState(prevState => ({ isPageBlurred: !prevState.isPageBlurred }));
  }

  render () {
    const { children, isImageFullscreen, useWhiteForNav, language } = this.props;
    return (
      <LanguageContext.Provider value={language}>
        <React.Fragment>
          <div className="page-wrapper">
            <Helmet>
              <html lang={language.toLowerCase()} />
              <link rel="preconnect" href="https://www.google-analytics.com" />
              <link rel="preconnect" href="https://www.google.com" />
              <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&display=swap&subset=cyrillic" rel="stylesheet" />
            </Helmet>
            <a href="#content" className="skip-navigation">Пропустити навігацію</a>
            <Navbar isImageFullscreen={isImageFullscreen} useWhiteForNav={useWhiteForNav} />
            {children}
            <Subscribe />
            <Footer />
            <CookieConsent
              location="bottom"
              buttonText="Accept"
              declineButtonText="Decline"
              disableStyles={true}
              cookieName="gatsby-gdpr-google-analytics"
              buttonClasses="btn"
              containerClasses="cookie-consent"
              enableDeclineButton
              declineButtonClasses="btn btn--light"
              buttonWrapperClasses="cookie-consent__button-wrapper"
              contentClasses="cookie-consent__text"
            >
              We use cookies to analyze site traffic with Google Analytics. By clicking 'Accept,' you consent to data processing. You can opt out anytime. [Learn More]
            </CookieConsent>
          </div>
        </React.Fragment>
      </LanguageContext.Provider>
    );
  }
}

export default ({ children, isImageFullscreen, useWhiteForNav, language }) => (
  <Location>
    {({ location }) => (
      <Layout
        location={location}
        isImageFullscreen={isImageFullscreen}
        useWhiteForNav={useWhiteForNav}
        language={language}
      >
        {children}
      </Layout>
    )}
  </Location>
);
