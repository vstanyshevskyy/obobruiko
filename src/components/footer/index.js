import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Footer from './FooterDisplay';

export default () => {
  const { footer: { frontmatter: { content } } } = useStaticQuery(graphql`
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
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const { copyrightText } = content.find(c => c.language === language) || defaultContent;
  return (
    <Footer
      copyrightText={copyrightText}
    />
  );
};
