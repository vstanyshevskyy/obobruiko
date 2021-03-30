/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import classNames from 'classnames';
import Img from 'gatsby-image';
import ReactMarkdown from 'react-markdown';
import './article.less';
import './pages.less';
import Layout from '../layouts';
import ThemeContext from '../context/ThemeContext';
import SEO from '../components/SEO';
import Certificates from '../components/certificates';

export default class Content extends React.Component {
  render() {
    const {
      data: {
        page: {
          frontmatter: {
            content
          }
        }
      },
      pageContext: {
        language,
        otherLanguages
      }
    } = this.props;
    const {
      title, subtitle, metaKeywords, metaDescription, path, image, imageAlt, text, useWhiteForNav
    } = content.find(c => c.language === language);
    console.log(useWhiteForNav);
    const seoData = Object.assign({
      title, metaKeywords, metaDescription, useTitleTemplate: true, url: path, image
    });
    const className = classNames(
      'index-page__content-wrapper',
      'index-page__content-wrapper--page'
    );
    return (
      <Layout isImageFullscreen language={language} useWhiteForNav={useWhiteForNav}>
        <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
        <div className="page__head">
          { image
            ? <Img alt={imageAlt} className="page__image" fluid={image.childImageSharp.fluid} />
            : null }
          <div className="content__page-head-wrapper">
            <div className="content__page-head-text">
              <h1 className="page__title">{title}</h1>
              <div className="page__subtitle">{subtitle}</div>
            </div>
          </div>
        </div>
        <div className={className} id="content">
          <div class="content__content content__content--certificates">
            <Certificates hostPageUrl={path} />
          </div>
          <article className="content__page">
            <div className="content__page-wrapper">
              <div
                className="content__content"
                ref={c => { this.contentNode = c; }}
              >
                <ReactMarkdown source={text} />
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }
}

Content.contextType = ThemeContext;

export const pageQuery = graphql`
  query pageQuery($slug: String!) {
    page: markdownRemark(frontmatter: { content: {elemMatch: {path: {eq: $slug}}}}) {
      frontmatter {
        content {
          language
          path
          title
          subtitle
          text,
          useWhiteForNav,
          image {
            relativePath
            childImageSharp {
              fluid(maxHeight: 1160, quality: 90) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
        }
      }
    }
  }
`;
