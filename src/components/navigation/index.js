import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import Config from '../../config';
import LanguageContext from '../../context/LanguageContext';
import Navbar from './NavigationDisplay';

export default ({ isImageFullscreen, showNavigationBackground }) => {
  const {
    navigation: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query NavigationQuery {
      navigation: markdownRemark(frontmatter: {
        contentType: { eq: "navbar_settings" }
      }){
        frontmatter {
          content {
            language
            logoText
            slogan
            ctaText
            links {
              text
              url
            }
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const { ...navProps } = content.find(c => c.language === language) || defaultContent;
  return (
    <Location>
      {
        ({ location }) => (
          <Navbar
            location={location.pathname}
            isImageFullscreen={isImageFullscreen}
            showNavigationBackground={showNavigationBackground}
            homeLink={`/${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}`}
            {...navProps}
          />
        )
      }
    </Location>
  );
};
