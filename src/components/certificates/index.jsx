import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Certificates from './certificatesDisplay';

export default ({ hostPageUrl }) => {
  const {
    certificates: {
      frontmatter: {
        content
      }
    }
  } = useStaticQuery(graphql`
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
                  fluid(maxWidth: 1160, quality: 85) {
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
  `);
  const language = useContext(LanguageContext);
  const defaultContent = content[0];
  const {
    pageUrl, ...certificatesProps
  } = content.find(c => c.lang === language) || defaultContent;
  if (hostPageUrl !== pageUrl) {
    return null;
  }
  return <Certificates {...certificatesProps} />;
};
