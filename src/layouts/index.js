import React from 'react';
import Helmet from 'react-helmet';
import { Location } from '@reach/router';

import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import LanguageContext from '../context/LanguageContext';

import '../components/styleguide/index.less';
import './index.less';

const Layout = ({
  children, isImageFullscreen, useWhiteForNav, language
}) => (
  <LanguageContext.Provider value={language}>
    <React.Fragment>
      <div className="page-wrapper">
        <Helmet>
          <html lang={language.toLowerCase()} />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700&display=swap&subset=cyrillic"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="https://app.termly.io/resource-blocker/775390f3-9116-4690-bfe3-e10982a065ca?autoBlock=on"
          />
        </Helmet>
        <a href="#content" className="skip-navigation">
          Пропустити навігацію
        </a>
        <Navbar isImageFullscreen={isImageFullscreen} useWhiteForNav={useWhiteForNav} />
        {children}
        <Subscribe />
        <Footer />
      </div>
    </React.Fragment>
  </LanguageContext.Provider>
);

const LayoutWrapper = ({
  children, isImageFullscreen, useWhiteForNav, language
}) => (
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

export default LayoutWrapper;
