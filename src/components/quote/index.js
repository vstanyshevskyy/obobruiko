import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Quote from './QuoteDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query QuoteQuery {
        quote: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "homepageQuoteSettings"} }}){
          edges{
            node{
              frontmatter{
                text
                author
              }
            }
          }
        }
      }
    `}
    render={({
      quote: {
        edges: [{
          node: {
            frontmatter: {
              ...props
            }
          }
        }]
      }
    }) => (
      <Quote {...props} />
    )}
  />
);
