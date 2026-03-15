/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

const isAdminPath = (pathname = '') => pathname === '/admin/' || pathname === '/admin';

exports.onRenderBody = ({ setHeadComponents, pathname }) => {
  if (isAdminPath(pathname)) {
    return;
  }

  setHeadComponents([
    React.createElement('link', {
      key: 'raleway-font',
      href: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap',
      rel: 'stylesheet'
    }),
    React.createElement('script', {
      key: 'termly-script',
      type: 'text/javascript',
      src: 'https://app.termly.io/resource-blocker/775390f3-9116-4690-bfe3-e10982a065ca?autoBlock=off'
    })
  ]);
};

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents, pathname }) => {
  if (isAdminPath(pathname)) {
    return;
  }

  const headComponents = getHeadComponents();
  
  // Move font preloads to the beginning for faster loading
  headComponents.sort((x, y) => {
    if (x.key === 'raleway-font' || x.key === 'opensans-font') {
      return -1;
    }
    if (y.key === 'raleway-font' || y.key === 'opensans-font') {
      return 1;
    }
    return 0;
  });

  replaceHeadComponents(headComponents);
};
