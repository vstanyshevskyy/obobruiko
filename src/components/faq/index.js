import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import FAQ from './faqDisplay';

export default () => {
  const {
    faq: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
      query FAQQuery {
        faq: markdownRemark(frontmatter: {
          contentType: { eq: "homepageFaq" }
        }){
          frontmatter {
            content {
              language
              isEnabled
              title
              subtitle
              faq {
                question
                answer
              }
            }
          }
        }
      }
    `);
  const language = useContext(LanguageContext);
  const {
    title,
    subtitle,
    faq,
    isEnabled
  } = content.find(c => c.language === language) || content[0];
  if (!isEnabled) {
    return null;
  }
  return (
    <FAQ
      title={title}
      subtitle={subtitle}
      items={faq}
    />
  );
};
