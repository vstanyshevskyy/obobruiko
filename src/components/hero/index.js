import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Hero from './HeroDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query HeroQuery {
        hero: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepageHeroSettings"} }}){
          edges{
            node{
              frontmatter{
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
      }
    `}
    render={({
      hero: {
        edges: [{
          node: {
            frontmatter: heroProps
          }
        }]
      }
    }) => <Hero {...heroProps} />}
  />
);
