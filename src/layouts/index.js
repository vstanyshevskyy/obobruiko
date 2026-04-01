import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';

import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Subscribe from '../components/subscribe';
import LanguageContext from '../context/LanguageContext';
import { ConsentProvider } from '../context/ConsentContext';
import ConsentBanner from '../components/consent';

import '../components/styleguide/index.less';
import './index.less';

function Layout({
  children,
  isImageFullscreen,
  useWhiteForNav,
  language,
  otherLanguages,
  location
}) {
  return (
    <LanguageContext.Provider value={language}>
      <ConsentProvider locationPath={location && location.pathname}>
        <>
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
          <ConsentBanner />
        </>
      </ConsentProvider>
    </LanguageContext.Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isImageFullscreen: PropTypes.bool,
  language: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  otherLanguages: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    isDefault: PropTypes.bool,
    title: PropTypes.string
  })),
  useWhiteForNav: PropTypes.bool
};

Layout.defaultProps = {
  isImageFullscreen: false,
  location: null,
  otherLanguages: [],
  useWhiteForNav: false
};

function LayoutWrapper({
  children,
  isImageFullscreen,
  useWhiteForNav,
  language,
  otherLanguages
}) {
  return (
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
}

LayoutWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isImageFullscreen: PropTypes.bool,
  language: PropTypes.string.isRequired,
  otherLanguages: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    isDefault: PropTypes.bool,
    title: PropTypes.string
  })),
  useWhiteForNav: PropTypes.bool
};

LayoutWrapper.defaultProps = {
  isImageFullscreen: false,
  otherLanguages: [],
  useWhiteForNav: false
};

export default LayoutWrapper;
