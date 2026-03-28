import config from '../../config'

const LANGUAGE_TO_HREF_LANG = {
  UK: 'uk',
  RU: 'ru',
  EN: 'en',
}

const CONTENT_TYPE_TO_OG = {
  article: 'article',
  home: 'website',
  page: 'website',
  collection: 'website',
}

const CONTENT_TYPE_TO_SCHEMA = {
  article: 'Article',
  home: 'WebPage',
  page: 'WebPage',
  collection: 'CollectionPage',
}

const stripMarkdown = (value = '') =>
  value
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[`*_>#~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const ensureLeadingSlash = (value = '') => {
  if (!value) {
    return ''
  }

  return value.startsWith('/') ? value : `/${value}`
}

const ensureTrailingSlash = (value) => {
  if (!value) {
    return value
  }

  return value.endsWith('/') ? value : `${value}/`
}

const isAbsoluteUrl = (value) => /^https?:\/\//i.test(value || '')

const joinUrl = (base, path = '') => {
  if (!path) {
    return ensureTrailingSlash(base)
  }

  if (isAbsoluteUrl(path)) {
    return ensureTrailingSlash(path)
  }

  const normalizedBase = (base || '').replace(/\/+$/, '')
  return ensureTrailingSlash(`${normalizedBase}${ensureLeadingSlash(path)}`)
}

const resolveAssetUrl = (asset) => {
  if (!asset) {
    return ''
  }

  if (typeof asset === 'string') {
    if (isAbsoluteUrl(asset)) {
      return asset
    }

    return `${config.url}${ensureLeadingSlash(asset)}`
  }

  if (asset.relativePath) {
    return `${config.url}/assets/${asset.relativePath}`
  }

  if (asset.publicURL) {
    return isAbsoluteUrl(asset.publicURL)
      ? asset.publicURL
      : `${config.url}${ensureLeadingSlash(asset.publicURL)}`
  }

  return ''
}

const normalizeHrefLang = (language) => {
  if (!language) {
    return null
  }

  if (language === 'x-default') {
    return language
  }

  return LANGUAGE_TO_HREF_LANG[language.toUpperCase()] || language.toLowerCase()
}

const buildAlternateLinks = ({ otherLanguages = {} }) => {
  const alternateLinks = Object.entries(otherLanguages).reduce(
    (acc, [language, href]) => {
      const hrefLang = normalizeHrefLang(language)

      if (!hrefLang || !href) {
        return acc
      }

      acc.push({
        hrefLang,
        href: isAbsoluteUrl(href)
          ? href
          : `${config.url}${ensureLeadingSlash(href)}`,
      })

      return acc
    },
    []
  )

  const defaultHref =
    alternateLinks.find((link) => link.hrefLang === 'uk')?.href ||
    alternateLinks[0]?.href

  if (
    defaultHref &&
    !alternateLinks.some((link) => link.hrefLang === 'x-default')
  ) {
    alternateLinks.push({
      hrefLang: 'x-default',
      href: defaultHref,
    })
  }

  return alternateLinks
}

const buildSchemaGraph = ({
  pageType,
  siteUrl,
  siteName,
  canonicalUrl,
  title,
  description,
  imageUrl,
  publishedTime,
  author,
  organizationTitle,
  publisherLogo,
  parentUrl,
  parentTitle,
}) => {
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: ensureTrailingSlash(siteUrl),
      name: siteName || organizationTitle || title,
    },
  ]

  const schemaType = CONTENT_TYPE_TO_SCHEMA[pageType] || 'WebPage'

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    url: canonicalUrl,
    name: title,
    description,
    image: imageUrl || undefined,
  }

  if (pageType === 'article') {
    pageSchema.headline = title
    pageSchema.author = author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined
    pageSchema.publisher = organizationTitle
      ? {
          '@type': 'Organization',
          name: organizationTitle,
          url: ensureTrailingSlash(siteUrl),
          logo: publisherLogo
            ? {
                '@type': 'ImageObject',
                url: publisherLogo,
              }
            : undefined,
        }
      : undefined
    pageSchema.mainEntityOfPage = {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    }
    pageSchema.datePublished = publishedTime || undefined
  }

  graph.push(pageSchema)

  if (pageType === 'article' && parentUrl && parentTitle) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': ensureTrailingSlash(parentUrl),
            name: parentTitle,
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@id': canonicalUrl,
            name: title,
          },
        },
      ],
    })
  }

  return graph
}

export const buildSeoModel = ({
  pageType = 'page',
  defaults = {},
  data = {},
  otherLanguages = {},
}) => {
  const titleBase = data.title || defaults.title || ''
  const useTitleTemplate = Boolean(data.useTitleTemplate)
  const titleSuffix = useTitleTemplate ? defaults.titleTemplate || '' : ''
  const title = `${titleBase}${titleSuffix}`
  const excerpt = stripMarkdown(data.excerpt || data.description || '')
  const description =
    data.metaDescription ||
    data.description ||
    excerpt ||
    defaults.metaDescription ||
    ''
  const openGraphDescription =
    data.fbDescription || defaults.fbDescription || description
  const canonicalUrl = joinUrl(defaults.url || config.url, data.url || '')
  const parentUrl = data.parentUrl
    ? joinUrl(defaults.url || config.url, data.parentUrl)
    : ''
  const imageUrl = resolveAssetUrl(
    data.fbImage || data.image || defaults.fbImage
  )
  const faviconUrl = resolveAssetUrl(data.favicon || defaults.favicon)
  const publishedTime = data.datePublished || data.publishedTime || ''
  const author = data.author || defaults.defaultAuthor || ''
  const alternateLinks = buildAlternateLinks({ otherLanguages })
  const publisherLogo = resolveAssetUrl(
    defaults.defaultAuthorImage || defaults.fbImage
  )

  return {
    title,
    description,
    canonicalUrl,
    imageUrl,
    faviconUrl,
    publishedTime,
    ogType: CONTENT_TYPE_TO_OG[pageType] || 'website',
    ogTitle: data.fbTitle || title,
    ogDescription: openGraphDescription,
    fbAppID: data.fbAppID,
    metaRobots: data.metaRobots || 'index,follow',
    alternateLinks,
    schemaOrgJSONLD: buildSchemaGraph({
      pageType,
      siteUrl: defaults.url || config.url,
      siteName: defaults.siteName,
      canonicalUrl,
      title,
      description,
      imageUrl,
      publishedTime,
      author,
      organizationTitle: defaults.organizationTitle,
      publisherLogo,
      parentUrl,
      parentTitle: data.parentTitle,
    }),
  }
}
