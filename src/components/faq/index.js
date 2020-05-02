import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import FAQ from './faqDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FAQQuery {
        faq: markdownRemark(frontmatter: {
          contentType: { eq: "homepageFaq" }
        }){
          frontmatter {
            content {
              language
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
    `}
    render={({
      faq: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const {
        title,
        subtitle,
        faq
      } = content.find(c => c.language === language) || content[0];
      return (
        <FAQ
          title={title}
          subtitle={subtitle}
          items={faq}
        />
      )
    }}
  />
);
