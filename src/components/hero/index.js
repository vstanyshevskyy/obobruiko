import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Hero from './HeroDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        hero: markdownRemark(frontmatter: {
          contentType: { eq: "homepageHeroSettings" }
        }){
          frontmatter {
            content {
              language
              text
              buttonText
              buttonHref
              image {
                relativePath
                childImageSharp {
                  fluid(maxWidth: 2500, srcSetBreakpoints: [768]) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              imageAlt
            }
          }
        }
      }
    `}
    render={({
      hero: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const heroProps = content.find(c => c.language === language) || content[0];
      return <Hero {...heroProps} />;
    }}
  />
);
