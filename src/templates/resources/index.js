/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { graphql } from 'gatsby'
import { format } from 'date-fns'
import { uk, enGB, ru } from 'date-fns/locale'
import classNames from 'classnames'
// import readingTime from 'reading-time';
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactMarkdown from '../../components/markdown'
import Config from '../../config'
import './article.less'
import Layout from '../../layouts'
import ThemeContext from '../../context/ThemeContext'
import SEO from '../../components/SEO'
import Tiles from '../../components/tiles-list'
import { RESOURCE_LIST_TITLE } from '../../components/SEO/pageTitles'

export default class Content extends React.Component {
  constructor() {
    super()
    this.makeLinksOpenInNewTab = this.makeLinksOpenInNewTab.bind(this)
  }

  componentDidMount = () => {
    this.mountAddThis()
    this.makeLinksOpenInNewTab()
  }

  mountAddThis = () => {
    const script = document.createElement('script')
    script.src = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${Config.addThis.id}`
    script.async = true
    document.body.appendChild(script)
  }

  makeLinksOpenInNewTab() {
    this.contentNode.querySelectorAll('a').forEach((el) => {
      el.setAttribute('target', '_blank')
      el.setAttribute('rel', 'noopener')
    })
  }

  render() {
    const {
      pageContext: { language, otherLanguages },
      data: {
        resource: {
          frontmatter: {
            publishTime,
            relatedLinks,
            relatedContentTitle,
            relatedContentDescription,
            content,
          },
        },
        allContent: { edges: allContentEdges },
      },
    } = this.props

    // Map language codes to date-fns locales
    const localeMap = {
      UK: uk,
      RU: ru,
      EN: enGB,
    }

    const currentLocale = localeMap[language] || uk

    const {
      image,
      imageAlt,
      imageTitle,
      title,
      subtitle,
      useWhiteForNav,
      text,
    } = content.find((c) => c.language === language)

    const { isDarkModeEnabled } = this.context

    const defaultLanguage = Config.languages.find((l) => l.isDefault).title
    const relatedItems = allContentEdges
      .filter(
        ({
          node: {
            frontmatter: { content: relContent },
          },
        }) =>
          relContent.some(
            (rc) => relatedLinks && relatedLinks.includes(rc.path)
          )
      )
      .map(
        ({
          node: {
            frontmatter: { content: relContent },
          },
        }) => {
          const c =
            relContent.find((rc) => rc.language === language) || relContent[0]
          return {
            url: `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}${c.path}`,
            title: c.title,
            subtitle: c.subtitle,
            image: c.image,
            image_alt: c.image_alt,
          }
        }
      )

    const className = classNames(
      'index-page__content-wrapper',
      'index-page__content-wrapper--article',
      {
        'index-page__content-wrapper--dark': isDarkModeEnabled,
      }
    )
    // const stats = readingTime(text);

    return (
      <Layout
        language={language}
        useWhiteForNav={useWhiteForNav}
        otherLanguages={otherLanguages}
      >
        <div className={className} id="content">
          <article className="content__article">
            <div className="content__article-head">
              <h1 className="content__title">{title}</h1>
              {subtitle && <div className="content__subtitle">{subtitle}</div>}
              <div
                className={classNames('content__info', {
                  'content__date--dark': isDarkModeEnabled,
                })}
              >
                <div className="content__date">
                  {publishTime &&
                    format(new Date(publishTime), 'dd MMMM yyyy', {
                      locale: currentLocale,
                    })}
                </div>
                <div className="addthis_inline_share_toolbox" />
              </div>
            </div>
            {image ? (
              <>
                <GatsbyImage
                  image={image.childImageSharp.gatsbyImageData}
                  alt={imageAlt}
                  className="article-title__image"
                />
                {imageTitle && <div className="figcaption">{imageTitle}</div>}
              </>
            ) : null}
            <div className="content__article-wrapper">
              <div
                className="content__content"
                ref={(c) => {
                  this.contentNode = c
                }}
              >
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>
            </div>
          </article>
          {relatedItems.length > 0 && (
            <Tiles
              id="related"
              title={relatedContentTitle}
              subtitle={relatedContentDescription}
              items={relatedItems}
            />
          )}
        </div>
      </Layout>
    )
  }
}

Content.contextType = ThemeContext

export const pageQuery = graphql`
  query resourceContentQuery($slug: String!) {
    resource: markdownRemark(
      frontmatter: { content: { elemMatch: { path: { eq: $slug } } } }
    ) {
      fields {
        slug
        collection
      }
      frontmatter {
        publishTime
        relatedLinks
        relatedContentTitle
        relatedContentDescription
        content {
          language
          path
          image {
            relativePath
            childImageSharp {
              gatsbyImageData(quality: 90, layout: FULL_WIDTH)
            }
          }
          imageAlt: image_alt
          imageTitle: image_title
          useWhiteForNav
          title
          seoTitle
          subtitle
          reading_time
          metaDescription
          fbTitle
          fbDescription
          sharing_image {
            relativePath
            publicURL
          }
          text
        }
      }
    }
    allContent: allMarkdownRemark(
      filter: {
        fields: {
          collection: {
            in: ["resources", "questionnaires", "articles", "pages"]
          }
        }
      }
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
                  gatsbyImageData(layout: FULL_WIDTH)
                }
              }
              image_alt
            }
          }
        }
      }
    }
  }
`

export const Head = ({ pageContext, data }) => {
  const { otherLanguages, language } = pageContext
  const {
    resource: { frontmatter },
  } = data

  // Get the content for the current language
  const content = frontmatter.content.find((c) => c.language === language)

  const seoData = {
    title: content.seoTitle || content.title,
    excerpt: content.text,
    image: content.image,
    fbImage: content.sharing_image || content.image,
    metaDescription: content.metaDescription,
    fbTitle: content.fbTitle,
    fbDescription: content.fbDescription,
    url: content.path,
    parentUrl: 'resources',
    parentTitle: RESOURCE_LIST_TITLE[language] || RESOURCE_LIST_TITLE.UK,
    datePublished: frontmatter.publishTime,
  }
  return (
    <SEO
      language={language}
      data={seoData}
      pageType="article"
      otherLanguages={otherLanguages}
    />
  )
}
