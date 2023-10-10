import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LanguageContext from '../../context/LanguageContext';

import Reviews from './ReviewsDisplay';

export default () => {
  const {
    reviews: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
    query ReviewsQuery {
      reviews: markdownRemark(frontmatter: {
        contentType: { eq: "reviews" }
      }){
        frontmatter {
          content {
            language
            title
            isEnabled
            reviews {
              name
              text
            }
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const { isEnabled, ...props } = content.find(c => c.language === language) || defaultContent;

  if (!isEnabled) {
    return null;
  }
  return (
    <Reviews {...props} />
  );
};
