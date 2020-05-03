import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LanguageContext from '../../context/LanguageContext';

import Quote from './QuoteDisplay';

export default () => {
  const {
    quote: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query QuoteQuery {
      quote: markdownRemark(frontmatter: {
        contentType: { eq: "homepageQuoteSettings" }
      }){
        frontmatter {
          content {
            language
            text
            author
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const props = content.find(c => c.language === language) || defaultContent;
  return (
    <Quote {...props} />
  );
};
