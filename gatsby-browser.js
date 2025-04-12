/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */


export const onInitialClientRender = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    region: ['UA']
  });

  if (localStorage.getItem('cookieConsent') === 'true') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
};
