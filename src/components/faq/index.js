import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import FAQ from './faqDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FAQQuery {
        faq: markdownRemark(frontmatter: {
          contentType: { eq: "homepageFaq" }
        }){
          frontmatter {
            title
            subtitle
            faq {
              question
              answer
            }
          }
        }
      }
    `}
    render={({
      faq: {
        frontmatter: {
          title,
          subtitle,
          faq
        }
      }
    }) => (
      <FAQ
        title={title}
        subtitle={subtitle}
        items={faq}
      />
    )}
  />
);
