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
  const props = content.find(c => c.language === language) || defaultContent;

  return (
    <Reviews {...props} />
  );
};
