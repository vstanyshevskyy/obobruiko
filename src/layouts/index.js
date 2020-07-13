import React from 'react';
import Helmet from 'react-helmet';
import { Location } from '@reach/router';

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
              <link href="/assets/icon-57x57.png" sizes="57x57" rel="apple-touch-icon" />
              <link href="/assets/icon-72x72.png" sizes="72x72" rel="apple-touch-icon" />
              <link href="/assets/icon-114x114.png" sizes="114x114" rel="apple-touch-icon" />
              <link href="/assets/icon-144x144.png" sizes="144x144" rel="apple-touch-icon" />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <link href="/assets/splashscreen/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
              <link href="/assets/splashscreen/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
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
