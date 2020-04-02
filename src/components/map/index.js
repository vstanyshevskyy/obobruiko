import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Map from './MapDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query MapQuery {
        map: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepageMapSettings"} }}){
          edges{
            node{
              frontmatter{
                link
                linkTitle
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
      map: {
        edges: [{
          node: {
            frontmatter: mapProps
          }
        }]
      }
    }) => <Map {...mapProps} />}
  />
);
