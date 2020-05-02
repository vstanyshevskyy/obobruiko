import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Location } from '@reach/router';

import Config from '../../config';
import LanguageContext from '../../context/LanguageContext';
import Navbar from './NavigationDisplay';

export default ({ isImageFullscreen }) => (
  <StaticQuery
    query={graphql`
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
    `}
    render={({ navigation: { frontmatter: { content } } }) => {
      const language = useContext(LanguageContext);
      const { ...navProps } = content.find(c => c.language === language) || content[0];
      return (
        <Location>
          {
            ({ location }) => (
              <Navbar
                location={location.pathname}
                isImageFullscreen={isImageFullscreen}
                homeLink={`/${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}`}
                {...navProps}
              />
            )
          }
        </Location>
      );
    }
    }
  />
);
