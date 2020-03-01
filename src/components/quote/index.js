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
      quote = '“Кожен з нас потребує когось поруч”',
      author = '- з х/ф "Сирота Бруклін"'
    }) => (
      <Quote
        quote={quote}
        author={author}
      />
    )}
  />
);
