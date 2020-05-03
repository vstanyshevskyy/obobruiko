import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import LanguageContext from '../../context/LanguageContext';

import AboutMe from './AboutMeDisplay';

export default () => {
  const {
    aboutMe: {
      frontmatter: { content }
    }
  } = useStaticQuery(graphql`
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
  `);
  const language = useContext(LanguageContext);
  const fallbackContent = content[0];
  const aboutMeProps = content.find(c => c.language === language) || fallbackContent;
  return (
    <AboutMe {...aboutMeProps} />
  );
};
