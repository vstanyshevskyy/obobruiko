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
      resources: { edges: allResources },
      settings: { frontmatter: { content: settingsContent } }
    },
    pageContext: {
      language
    }
  } = props;
  const settings = settingsContent.find(s => s.language === language) || settingsContent[0];
  const resources = allResources.map(r => r.node.frontmatter.content)[0];
  const thisLanguageResources = resources.filter(s => s.language === language) || resources[0];
  console.log(resources, thisLanguageResources)
  const items = thisLanguageResources.map(r => ({ ...r, url: `/${language === Config.languages.find(l => l.isDefault).title ? '' : language.toLowerCase()}/${r.url}` }));
  return (
    <Layout language={language}>
      <SEO data={{ ...settings, url: path }} />

      <main id="content">
        <h1 className="index-page__title">{settings.title}</h1>
        <div className="index-page__subtitle">
          <ReactMarkdown source={settings.subtitle} />
        </div>
        <Tiles
          id="questionnaires"
          items={items}
        />
      </main>
    </Layout>
  );
};


export const pageQuery = graphql`
  query resourcesContentListQuery {
    resources: allMarkdownRemark(
      filter: { frontmatter:  { contentType: { eq: "values" } } }
      sort: { fields: [frontmatter___publishTime], order: DESC }
    ){
      edges{
        node{
          frontmatter {
            content {
              url: path
              language
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
