import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from '../../components/markdown';
import '../index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Tiles from '../../components/tiles-list';
import Config from '../../config';

import './articlesListPage.less';

export default props => {
  const {
    path,
    data: {
      articles: { edges: articles },
      settings: { frontmatter: { content: settingsContent } }
    },
    pageContext: {
      language
    }
  } = props;

  const settings = settingsContent.find(s => s.language === language) || settingsContent[0];
  const items = articles.map(({ node: { frontmatter: { content: [a] } } }) => ({ ...a, url: `/${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}/${a.url}` }));
  return (
    <Layout language={language}>
      <SEO data={{ ...settings, url: path }} />

      <main id="content">
        <h1 className="index-page__title">{settings.title}</h1>
        <div className="index-page__subtitle">
          <ReactMarkdown source={settings.subtitle} />
        </div>
        <Tiles
          id="articles"
          items={items}
        />
      </main>
    </Layout>
  );
};


export const pageQuery = graphql`
  query contentListQuery {
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
    settings: markdownRemark(
      frontmatter: {
        contentType: { eq: "articles_settings" }
      }
    ) {
      frontmatter {
        content {
          language
          title
          subtitle
          metaDescription
          metaKeywords
        }
      }
    }
  }
`;