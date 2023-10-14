import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Config from '../../config';
import LanguageContext from '../../context/LanguageContext';
import Tiles from '../tiles-list';

export default () => {
  const {
    articlesSettings: {
      frontmatter: {
        content: articlesSettings
      }
    },
    articles: { edges: articlesRaw }
  } = useStaticQuery(graphql`
    query RecentArticlesQuery {
      articlesSettings: markdownRemark(frontmatter: {
        contentType: { eq: "homepageArticlesSettings" }
      }){
        frontmatter {
          content {
            language
            title
            subtitle
          }
        }
      }
      articles: allMarkdownRemark(
        filter: { fields:  { collection: { eq: "articles"} }}
        sort: { frontmatter: {publishTime: DESC } }
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
  `);
  const language = useContext(LanguageContext);
  const fallbackContent = articlesSettings[0];
  const {
    title,
    subtitle,
    articlesCount
  } = articlesSettings.find(s => s.language === language) || fallbackContent;
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
      items={articles.map(a => ({ ...a, url: `${language === Config.languages.find(l => l.isDefault).title ? '' : `/${language.toLowerCase()}`}${a.url}` }))}
    />
  );
};
