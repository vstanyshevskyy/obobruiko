import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import LanguageContext from '../../context/LanguageContext';

import AboutMe from './AboutMeDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query AboutMeQuery {
        aboutMe: markdownRemark(frontmatter: {
          contentType: { eq: "homepageAboutMeSettings" }
        }){
          frontmatter {
            content {
              language
              title
              text
              image {
                relativePath
                childImageSharp {
                  fluid(maxWidth: 700, srcSetBreakpoints: [420, 350]) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageAlt
              ctaText
              ctaHref
            }
          }
        }
      }
    `}
    render={({
      aboutMe: {
        frontmatter: { content }
      }
    }) => {
      const language = useContext(LanguageContext);
      const aboutMeProps = content.find(c => c.language === language) || content[0];
      return (
        <AboutMe {...aboutMeProps} />
      );
    }}
  />
);
