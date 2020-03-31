import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Tiles from '../tiles-list';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        articles: allMarkdownRemark(
          filter: { fields:  { collection: { eq: "articles"} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
          limit: 4
        ){
          edges{
            node{
              fields {
                collection
              }
              frontmatter {
                title
                url: path
                subtitle
                image {
                  relativePath
                  childImageSharp {
                    fluid(maxHeight: 1160) {
                      ...GatsbyImageSharpFluid_tracedSVG
                      presentationWidth
                    }
                  }
                }
                image_alt
              }
            }
          }
        }
      }
    `}
    render={({
      title = 'Статті',
      subtitle = 'This is your News section introductory paragraph. Use this space to give background on the articles below, including press coverage, industry updates and useful resources. Take this chance to establish yourself or your business as an authority in the field.',
      articles: { edges: articlesRaw }
    }) => (
      <Tiles
        title={title}
        subtitle={subtitle}
        items={articlesRaw.map(a => a.node.frontmatter)}
      />
    )
    }
  />
);
