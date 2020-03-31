/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import 'moment/locale/uk';
import classNames from 'classnames';
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
    moment.locale('uk');
    const {
      data: {
        page: {
          html,
          fields: {
            readingTime: {
              minutes
            }
          },
          frontmatter: {
            image,
            imageAlt,
            title,
            subtitle,
            publishTime = '',
            metaKeywords,
            metaDescription,
            path
          }
        }
      }
    } = this.props;

    const { isDarkModeEnabled } = this.context;

    const seoData = Object.assign({
      title, metaKeywords, metaDescription, useTitleTemplate: true, url: path, image
    });
    const className = classNames(
      'index-page__content-wrapper',
      'index-page__content-wrapper--article',
      {
        'index-page__content-wrapper--dark': isDarkModeEnabled
      }
    );
    return (
      <Layout>
        <div className={className} id="content">
          <SEO data={seoData} isBlogPost />
          <article className="content__article">
            <div className="content__article-head">
              <h1 className="content__title">{title}</h1>
              <div className="content__subtitle">{subtitle}</div>
              <div className={classNames('content__info', { 'content__date--dark': isDarkModeEnabled })}>
                <div className="content__date">
                  {moment(publishTime).format('LL')}
                  {' · '}
                  { Math.ceil(minutes) }
                  {' хв'}
                </div>
                <div className="addthis_inline_share_toolbox" />
              </div>
            </div>
            { image
              ? <NonStrechedImage alt={imageAlt} className="article-card__image" fluid={image.childImageSharp.fluid} />
              : null }
            <div className="content__article-wrapper">
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
  query contentQuery($slug: String!) {
    page: markdownRemark(
      frontmatter: {
        path: { eq: $slug }
      }
    ) {
      html
      fields {
        slug
        collection
        readingTime {
          minutes
        }
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
        reading_time
        publishTime
        metaKeywords
        metaDescription
      }
    }
  }
`;
