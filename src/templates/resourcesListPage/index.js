import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from '../../components/markdown';
import '../index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Tiles from '../../components/tiles-list';
import Config from '../../config';

import './index.less';

export default props => {
  const {
    path,
    data: {
      resources: { edges: articles },
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
      allLangItems.push({ ...c, url: `/${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}/${c.url}` });
    });
  });
  const items = allLangItems.filter(a => a.language === language);
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
  query resourcesContentListQuery {
    resources: allMarkdownRemark(
      filter: { fields:  { collection: { eq: "resources"} }}
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
        contentType: { eq: "resources_settings" }
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
