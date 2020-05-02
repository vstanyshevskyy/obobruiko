import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';

import LanguageContext from '../../context/LanguageContext';
import Tiles from '../tiles-list';

export default () => (
  <StaticQuery
    query={graphql`
      query RecentArticlesQuery {
        articlesSettings: markdownRemark(frontmatter: {
          contentType: { eq: "homepageArticlesSettings" }
        }){
          frontmatter {
            content {
              language
              title
              subtitle
              articlesCount
            }
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
                content {
                  language
                  url: path
                  title
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
      }
    `}
    render={({
      articlesSettings: {
        frontmatter: {
          content: articlesSettings
        }
      },
      articles: { edges: articlesRaw }
    }) => {
      const language = useContext(LanguageContext);
      const {
        title,
        subtitle,
        articlesCount
      } = articlesSettings.find(s => s.language === language) || articlesSettings[0];
      const articles = articlesRaw.reduce((list, { node: { frontmatter: { content } } }) => {
        const data = content.find(c => c.language === language);
        if (data) {
          list.push(data);
        }
        return list;
      }, []);
      if (!articles.length) {
        return null;
      }
      return (
        <Tiles
          id="articles"
          title={title}
          subtitle={subtitle}
          items={articles.slice(0, articlesCount).map(a => ({ ...a, url: `/${a.language.toLowerCase()}/${a.url}` }))}
        />
      );
    }
    }
  />
);
