import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import ServicesDisplay from './ServicesDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query ServicesQuery {
        services: markdownRemark(frontmatter: {
          contentType: { eq: "homepageServices" }
        }){
          frontmatter {
            title
            subtitle
            services {
              title
              text
              image{
                relativePath
                childImageSharp {
                  fluid(maxWidth: 960, srcSetBreakpoints: [768]) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              linkText
              link
            }
          }
        }
      }
    `}
    render={({
      services: {
        frontmatter: {
          title,
          subtitle,
          services
        }
      }
    }) => (
      <ServicesDisplay
        title={title}
        subtitle={subtitle}
        services={services}
      />
    )}
  />
);
