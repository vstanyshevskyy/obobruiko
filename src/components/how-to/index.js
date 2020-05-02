import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import HowTo from './HowToDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query howToQuery {
        howTo: markdownRemark(frontmatter: {
          contentType: { eq: "homepageHowToSettings" }
        }){
          frontmatter {
            content {
              language
              title
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
    `}
    render={({
      howTo: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const { title, steps } = content.find(c => c.language === language) || content[0];
      return (
        <HowTo
          title={title}
          steps={steps}
        />
      )
    }}
  />
);
