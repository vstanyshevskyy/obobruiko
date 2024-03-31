import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from '../../components/markdown';
import '../index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Tiles from '../../components/tiles-list';
import Config from '../../config';

import './articlesListPage.less';

const ArticlesListPage = props => {
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
  const allLangItems = []
  articles.forEach(({ node: { frontmatter: { content } } }) => {
    content.forEach(c => {
      allLangItems.push({ ...c, url: `${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}${c.url}` });
    });
  });
  const items = allLangItems.filter(a => a.language === language);
  return (
    <Layout language={language}>
      <SEO data={{ ...settings, url: path }} />

      <main id="content" className="articles-list__content">
        <h1 className="index-page__title">{settings.title}</h1>
        {settings.subtitle && (
          <div className="index-page__subtitle">
            <ReactMarkdown>{settings.subtitle}</ReactMarkdown>
          </div>
        )}
        <Tiles
          id="articles"
          items={items}
        />
      </main>
    </Layout>
  );
};

export default ArticlesListPage;

export const pageQuery = graphql`query contentListQuery {
  articles: allMarkdownRemark(
    filter: {fields: {collection: {eq: "articles"}}}
    sort: {frontmatter: {publishTime: DESC}}
  ) {
    edges {
      node {
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
                gatsbyImageData(height: 1160, placeholder: TRACED_SVG, layout: FULL_WIDTH)
              }
            }
            image_alt
          }
        }
      }
    }
  }
  settings: markdownRemark(frontmatter: {contentType: {eq: "articles_settings"}}) {
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
}`;
