import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Hero from './HeroDisplay';

export default () => {
  const {
    hero: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
    query HeroQuery {
      hero: markdownRemark(frontmatter: {
        contentType: { eq: "homepageHeroSettings" }
      }){
        frontmatter {
          content {
            language
            text
            subtitle
            buttonText
            buttonHref
            image {
              relativePath
              childImageSharp {
                fluid(maxWidth: 2500, quality: 90, srcSetBreakpoints: [768]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            imageAlt
          }
        }
      }
    }
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const heroProps = content.find(c => c.language === language) || defaultContent;
  return <Hero {...heroProps} />;
};
