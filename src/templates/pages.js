/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import 'moment/locale/uk';
import classNames from 'classnames';
import Img from 'gatsby-image';
import './article.less';
import './pages.less';
import Layout from '../layouts';
import ThemeContext from '../context/ThemeContext';
import SEO from '../components/SEO';

export default class Content extends React.Component {
  render() {
    moment.locale('uk');
    const {
      data: {
        page: {
          html,
          frontmatter: {
            image,
            imageAlt,
            title,
            subtitle,
            metaKeywords,
            metaDescription,
            path
          }
        }
      }
    } = this.props;

    const seoData = Object.assign({
      title, metaKeywords, metaDescription, useTitleTemplate: true, url: path, image
    });
    const className = classNames(
      'index-page__content-wrapper',
      'index-page__content-wrapper--page'
    );
    return (
      <Layout isImageFullscreen>
        <SEO data={seoData} isBlogPost />
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
          <article className="content__page">
            <div className="content__page-wrapper">
              <div
                className="content__content"
                dangerouslySetInnerHTML={{ __html: html }}
                ref={c => { this.contentNode = c; }}
              />
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
    page: markdownRemark(
      frontmatter: {
        path: { eq: $slug }
      }
    ) {
      html
      fields {
        slug
        collection
      }
      frontmatter {
        path
        image {
          relativePath
          childImageSharp {
            fluid(maxHeight: 1160) {
              ...GatsbyImageSharpFluid_tracedSVG
              presentationWidth
            }
          }
        }
        imageAlt: image_alt
        title
        subtitle
        metaKeywords
        metaDescription
      }
    }
  }
`;
