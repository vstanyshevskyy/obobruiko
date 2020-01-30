import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import StoriesList from './RecentStoriesDisplay';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentStories {
        stories: allMarkdownRemark(
          filter: { frontmatter:  { contentType: { eq: "stories"} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
          limit: 4
        ){
          edges{
            node{
              frontmatter {
                title
                contentType
                path
                subtitle
                image_alt
              }
            }
          }
        }
      }
    `}
    render={({ stories: { edges: itemsRaw = [] } }) => (
      <StoriesList items={itemsRaw.map(i => i.node.frontmatter)} />
    )}
  />
);
