import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import ReactMarkdown from '../components/markdown';
import './index.less';
import Layout from '../layouts';
import SEO from '../components/SEO';

import './articlesListPage.less';

export default props => {
  const {
    path,
    data: {
      articles: { edges: articles },
      settings: { frontmatter: { content: settingsContent } }
    },
    pageContext: {
      ids,
      prevLink,
      nextLink,
      language
    }
  } = props;
  console.log(props);

  const settings = settingsContent.find(s => s.language === language) || settingsContent[0];

  return (
    <Layout language={language}>
      <SEO data={{ ...settings, url: path }} />

      <main className="index-page__content-wrapper index-page__content-wrapper" id="content">
        <h1 className="index-page__title">{settings.title}</h1>
        <div className="index-page__subtitle">
          <ReactMarkdown source={settings.subtitle} />
        </div>
        <ul className="index-page__list">
          { articles.map(({ node: { frontmatter: { content } } }) => {
            const {
              title, subtitle, path, image, image_alt: imageAlt
            } = content.find(c => c.language === language);
            return (
              <li className="index-page__list-item">
                <Link to={path} className="index-page__list-item-link-wrapper">
                  <Img alt={imageAlt} className="" fluid={image.childImageSharp.fluid} />
                  <div className="index-page__list-item-text">
                    <div className="index-page__list-link">
                      {title}
                    </div>
                    <p className="index-page__list-subtitle">{subtitle}</p>
                  </div>
                </Link>
              </li>
            );
          }) }
        </ul>
        {
          prevLink
            ? <Link to={prevLink}>Назад</Link>
            : null
        }
        {
          nextLink
            ? <Link to={nextLink}>Вперед</Link>
            : null
        }
      </main>
    </Layout>
  );
};


export const pageQuery = graphql`
  query contentListQuery($ids: [String]!) {
    articles: allMarkdownRemark(
      filter: { id: { in: $ids } }
      sort: { fields: [frontmatter___publishTime], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            content {
              language
              path
              title
              subtitle
              image {
                relativePath
                childImageSharp {
                  fluid(maxWidth: 650, maxHeight: 200, cropFocus: CENTER) {
                    ...GatsbyImageSharpFluid_tracedSVG
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
