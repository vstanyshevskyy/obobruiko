import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Footer from './FooterDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        footer: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
          edges{
            node{
              frontmatter{
                links {
                  text
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({ copyrightText = '©2019 by Психолог Олеся Бобруйко.' }) => (
      <Footer
        copyrightText={copyrightText}
      />
    )}
  />
);
