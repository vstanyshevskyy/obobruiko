import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Map from './MapDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query MapQuery {
        map: markdownRemark(frontmatter: {
          contentType: { eq: "homepageMapSettings" }
        }){
          frontmatter {
            content {
              language
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
    `}
    render={({
      map: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const mapProps = content.find(c => c.language === language) || content[0];
      return (<Map {...mapProps} />);
    }}
  />
);
