import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Quote from './QuoteDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query QuoteQuery {
        quote1: allMarkdownRemark(filter: { frontmatter:  { contentType: { eq: "footer_settings"} }}){
          edges{
            node{
              frontmatter{
                links {
                  text
                  url
                }
                socialIcons {
                  type
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={({
      quote = '“Discussing positive experiences leads to heightened well-being, increased overall life satisfaction and even more energy”',
      author = '- Nathaniel Lambert'
    }) => (
      <Quote
        quote={quote}
        author={author}
      />
    )}
  />
);
