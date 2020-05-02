import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Footer from './FooterDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        footer: markdownRemark(frontmatter: {
          contentType: { eq: "footer_settings" }
        }){
          frontmatter {
            content {
              language
              copyrightText
              links {
                text
                url
              }
            }
          }
        }
      }
    `}
    render={({ footer: { frontmatter: { content } } }) => {
      const language = useContext(LanguageContext);
      const { copyrightText } = content.find(c => c.language === language) || content[0];
      return (
        <Footer
          copyrightText={copyrightText}
        />
      );
    }}
  />
);
