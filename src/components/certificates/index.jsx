import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Certificates from './certificatesDisplay';

export default ({ hostPageUrl }) => (
  <StaticQuery
    query={graphql`
      query CertificatesQuery {
        certificates: markdownRemark(
          frontmatter: {
            contentType: { eq: "certificates_settings" }
          }
        ) {
          frontmatter {
            content {
              language
              pageUrl
              title
              certificates {
                image {
                  relativePath
                  full: childImageSharp {
                    fluid(maxWidth: 1160) {
                      ...GatsbyImageSharpFluid_tracedSVG
                      presentationWidth
                    }
                  }
                }
                text
              }
            }
          }
        }
      }
    `}
    render={({
      certificates: {
        frontmatter: {
          content
        }
      }
    }) => {
      const language = useContext(LanguageContext);
      const { pageUrl, ...certificatesProps } = content.find(c => c.lang === language) || content[0];
      if (hostPageUrl !== pageUrl) {
        return null;
      }
      return <Certificates {...certificatesProps} />;
    }}
  />
);
