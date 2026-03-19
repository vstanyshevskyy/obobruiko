import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import SEO from './SeoDisplay';

export default ({ language: languageProp, ...props }) => {
  const {
    seoDefaults: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query SeoDefaultsQuery {
      seoDefaults: markdownRemark(frontmatter: {
        contentType: { eq: "general_settings" }
      }){
        frontmatter {
          content {
            language
            title
            url
            favicon {
              relativePath
            }
            metaDescription
            fbTitle
            fbImage {
              relativePath
            }
            fbDescription
          }
        }
      }
    }
  `);
  const contextLanguage = useContext(LanguageContext);
  const language = languageProp || contextLanguage;
  const defaultContent = content[0];
  const defaults = content.find(c => c.language === language) || defaultContent;
  return (
    <>
      <html lang={language ? language.toLowerCase() : 'uk'} />
      <SEO defaults={defaults} {...props} />
    </>
  );
};
