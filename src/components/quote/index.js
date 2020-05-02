import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import LanguageContext from '../../context/LanguageContext';

import Quote from './QuoteDisplay';

export default () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={({
      quote: {
        frontmatter: { content }
      }
    }) => {
      const language = useContext(LanguageContext);
      const props = content.find(c => c.language === language) || content[0];
      return (
        <Quote {...props} />
      );
    }}
  />
);
