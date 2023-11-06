import React from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from '../../components/markdown';
import '../index.less';
import Layout from '../../layouts';
import SEO from '../../components/SEO';
import Tiles from '../../components/tiles-list';
import Config from '../../config';

import './questionnairesListPage.less';

const QuestionnariesListPage = props => {
  const {
    path,
    data: {
      questionnaires: { edges: questionnaires },
      settings: { frontmatter: { content: settingsContent } }
    },
    pageContext: {
      language
    }
  } = props;
  const settings = settingsContent.find(s => s.language === language) || settingsContent[0];
  const allLangItems = []
  questionnaires.forEach(({ node: { frontmatter: { content } } }) => {
    content.forEach(c => {
      allLangItems.push({ ...c, url: `${language === Config.languages.find(l => l.isDefault).title ? '' : `/${language.toLowerCase()}`}${c.url}` });
    });
  });
  const items = allLangItems.filter(a => a.language === language);
  return (
    <Layout language={language}>
      <SEO data={{ ...settings, url: path }} />

      <main id="content">
        <h1 className="index-page__title">{settings.title}</h1>
        <div className="index-page__subtitle">
          <ReactMarkdown>{settings.subtitle}</ReactMarkdown>
        </div>
        <Tiles
          id="questionnaires"
          items={items}
        />
      </main>
    </Layout>
  );
};

export default QuestionnariesListPage;

export const pageQuery = graphql`
  query questionnairesContentListQuery {
    questionnaires: allMarkdownRemark(
      filter: { fields:  { collection: { eq: "questionnaires"} }}
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
    settings: markdownRemark(
      frontmatter: {
        contentType: { eq: "questionnaires_settings" }
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
