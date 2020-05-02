import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import SEO from './SeoDisplay';

export default props => (
  <StaticQuery
    query={graphql`
      query SeoDefaultsQuery {
        seoDefaults: markdownRemark(frontmatter: {
          contentType: { eq: "general_settings" }
        }){
          frontmatter {
            content {
              language
              title
              url
              favicon  {
                relativePath
              }
              metaDescription
              metaKeywords
              fbTitle
              fbImage
              fbDescription
            }
          }
        }
      }
    `}
    render={({ seoDefaults: { frontmatter: { content } } }) => {
      const language = useContext(LanguageContext);
      const defaults = content.find(c => c.language === language) || content[0];
      return (
        <SEO defaults={defaults} {...props} />
      );
    }}
  />
);
