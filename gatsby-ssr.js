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
    React.createElement('script', {
      key: 'termly-script',
      type: 'text/javascript',
      src: 'https://app.termly.io/resource-blocker/775390f3-9116-4690-bfe3-e10982a065ca?autoBlock=off'
    })
  ]);
};
