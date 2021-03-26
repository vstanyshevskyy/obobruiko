import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import ServicesDisplay from './ServicesDisplay';

export default () => {
  const {
    services: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
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
                  fluid(maxWidth: 960, quality: 90, srcSetBreakpoints: [768]) {
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
  `);
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
};
