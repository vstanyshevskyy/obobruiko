import React from 'react';
import { Location } from '@reach/router';

import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import LanguageContext from '../context/LanguageContext';

import '../components/styleguide/index.less';
import './index.less';

const Layout = ({
  children, isImageFullscreen, useWhiteForNav, language, otherLanguages
}) => (
  <LanguageContext.Provider value={language}>
    <React.Fragment>
      <div className="page-wrapper">
        <a href="#content" className="skip-navigation">
          Пропустити навігацію
        </a>
        <Navbar 
          isImageFullscreen={isImageFullscreen} 
          useWhiteForNav={useWhiteForNav} 
          otherLanguages={otherLanguages}
        />
        {children}
        <Subscribe />
        <Footer />
      </div>
    </React.Fragment>
  </LanguageContext.Provider>
);

const LayoutWrapper = ({
  children, isImageFullscreen, useWhiteForNav, language, otherLanguages
}) => (
  <Location>
    {({ location }) => (
      <Layout
        location={location}
        isImageFullscreen={isImageFullscreen}
        useWhiteForNav={useWhiteForNav}
        language={language}
        otherLanguages={otherLanguages}
      >
        {children}
      </Layout>
    )}
  </Location>
);

export default LayoutWrapper;
