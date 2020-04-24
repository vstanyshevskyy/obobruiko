import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Tiles from '../tiles-list';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        articlesSettings: markdownRemark(frontmatter: {
          contentType: { eq: "homepageArticlesSettings" }
        }){
          frontmatter {
            title
            subtitle
            articlesCount
          }
        }
        articles: allMarkdownRemark(
          filter: { fields:  { collection: { eq: "articles"} }}
          sort: { fields: [frontmatter___publishTime], order: DESC }
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
      articlesSettings: {
        frontmatter: {
          title,
          subtitle,
          articlesCount
        }
      },
      articles: { edges: articlesRaw }
    }) => (
      <Tiles
        id="articles"
        title={title}
        subtitle={subtitle}
        items={articlesRaw.slice(0, articlesCount).map(a => a.node.frontmatter)}
      />
    )
    }
  />
);
