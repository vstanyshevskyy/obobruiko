import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import AboutMe from './AboutMeDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query AboutMeQuery {
        aboutMe: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepageAboutMeSettings"} }}){
          edges{
            node{
              frontmatter {
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
      }
    `}
    render={({
      aboutMe: {
        edges: [{
          node: {
            html,
            frontmatter: aboutMeProps
          }
        }]
      }
    }) => (
      <AboutMe {...aboutMeProps} text={html} />
    )}
  />
);
