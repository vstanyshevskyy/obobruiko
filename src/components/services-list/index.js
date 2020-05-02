import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import ServicesDisplay from './ServicesDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query ServicesQuery {
        services: markdownRemark(frontmatter: {
          contentType: { eq: "homepageServices" }
        }){
          frontmatter {
            content {
              language
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
      }
    `}
    render={({
      services: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const {
        title,
        subtitle,
        services
      } = content.find(c => c.language === language) || content[0];
      return (
        <ServicesDisplay
          title={title}
          subtitle={subtitle}
          services={services}
        />
      );
    }}
  />
);
