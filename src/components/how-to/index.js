import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import HowTo from './HowToDisplay';

export default () => {
  const {
    howTo: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
    query howToQuery {
      howTo: markdownRemark(frontmatter: {
        contentType: { eq: "homepageHowToSettings" }
      }){
        frontmatter {
          content {
            language
            title
            isEnabled
            steps {
              text
              title
              icon {
                relativePath
              }
            }
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const { title, steps, isEnabled } = content.find(c => c.language === language) || defaultContent;
  if (!isEnabled) {
    return null;
  }
  return (
    <HowTo
      title={title}
      steps={steps}
    />
  );
};
