import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

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
    `}
    render={({
      certificates: {
        frontmatter: {
          pageUrl,
          ...certificatesProps
        }
      }
    }) => {
      if (hostPageUrl !== pageUrl) {
        return null;
      }
      return <Certificates {...certificatesProps} />;
    }}
  />
);

// 