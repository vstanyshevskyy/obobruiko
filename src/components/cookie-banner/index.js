import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import CookieBanner from './CookieBannerDisplay';

export default () => {
  const {
    cookieBanner: {
      frontmatter: {
        content: bannerContent
      }
    }
  } = useStaticQuery(graphql`
    query CookieBannerQuery {
      cookieBanner: markdownRemark(frontmatter: {
        contentType: { eq: "cookie_banner" }
      }){
        frontmatter {
          content {
            language
            text
            acceptButtonText
            declineButtonText
            linkText
            linkUrl
          }
        }
      }
    }
  `);

  const language = useContext(LanguageContext);
  const defaultContent = bannerContent[0];

  const {
    text,
    acceptButtonText,
    declineButtonText,
    linkText,
    linkUrl
  } = bannerContent.find(c => c.language === language) || defaultContent;

  return (
    <CookieBanner
      text={text}
      acceptButtonText={acceptButtonText}
      declineButtonText={declineButtonText}
      linkText={linkText}
      linkUrl={linkUrl}
    />
  );
};
