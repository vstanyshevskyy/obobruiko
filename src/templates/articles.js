/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import 'moment/locale/uk';
import 'moment/locale/ru';
import classNames from 'classnames';
import readingTime from 'reading-time';
import ReactMarkdown from '../components/markdown';
import Config from '../config';
import './article.less';
import Layout from '../layouts';
import ThemeContext from '../context/ThemeContext';
import NonStrechedImage from '../components/non-stretched-image';
import SEO from '../components/SEO';


export default class Content extends React.Component {
  constructor() {
    super();
    this.makeLinksOpenInNewTab = this.makeLinksOpenInNewTab.bind(this);
  }

  componentDidMount = () => {
    this.mountAddThis();
    this.makeLinksOpenInNewTab();
  }

  mountAddThis = () => {
    const script = document.createElement('script');
    script.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${Config.addThis.id}`;
    script.async = true;
    document.body.appendChild(script);
  }

  makeLinksOpenInNewTab() {
    this.contentNode.querySelectorAll('a').forEach(el => {
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }

  render() {
    const {
      pageContext: {
        language,
        otherLanguages
      },
      data: {
        article: {
          frontmatter: {
            content
          }
        }
      }
    } = this.props;
    moment.locale(language.toLowerCase());
    const {
      path,
      image,
      imageAlt,
      imageTitle,
      title,
      subtitle,
      reading_time,
      publishTime,
      metaKeywords,
      metaDescription,
      useWhiteForNav,
      fbDescription,
      text
    } = content.find(c => c.language === language);

    const { isDarkModeEnabled } = this.context;

    const seoData = Object.assign({
      title, metaKeywords, metaDescription, useTitleTemplate: true, url: path, image, useWhiteForNav, fbDescription
    });
    const className = classNames(
      'index-page__content-wrapper',
      'index-page__content-wrapper--article',
      {
        'index-page__content-wrapper--dark': isDarkModeEnabled
      }
    );
    const stats = readingTime(text);

    return (
      <Layout language={language} useWhiteForNav={useWhiteForNav}>
        <div className={className} id="content">
          <SEO data={seoData} isBlogPost otherLanguages={otherLanguages} />
          <article className="content__article">
            <div className="content__article-head">
              <h1 className="content__title">{title}</h1>
              {subtitle && <div className="content__subtitle">{subtitle}</div>}
              <div className={classNames('content__info', { 'content__date--dark': isDarkModeEnabled })}>
                <div className="content__date">
                  {moment(publishTime).format('LL')}
                  {' · '}
                  { Math.ceil(stats.minutes) }
                  {' хв'}
                </div>
                <div className="addthis_inline_share_toolbox" />
              </div>
            </div>
            { image
              ? (
                <>
                  <NonStrechedImage alt={imageAlt} className="article-title__image" fluid={image.childImageSharp.fluid} />
                  {imageTitle && <div className="figcaption">{imageTitle}</div>}
                </>
              )
              : null }
            <div className="content__article-wrapper">
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
  query contentQuery($slug: String!) {
    article: markdownRemark(frontmatter: { content: {elemMatch: {path: {eq: $slug}}}}) {
      fields {
        slug
        collection
      }
      frontmatter {
        content {
          language
          path
          image {
            relativePath
            childImageSharp {
              fluid(maxHeight: 1160, quality: 90) {
                ...GatsbyImageSharpFluid_tracedSVG
                presentationWidth
              }
            }
          }
          imageAlt: image_alt
          imageTitle: image_title
          useWhiteForNav
          title
          subtitle
          reading_time
          publishTime
          metaKeywords
          metaDescription
          fbDescription
          text
        }
      }
    }
  }
`;
