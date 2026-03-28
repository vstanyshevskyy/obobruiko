import React from 'react'
import { buildSeoModel } from './seoModel'

const SEO = ({
  data = {},
  pageType = 'page',
  defaults = {},
  otherLanguages = {},
}) => {
  const seo = buildSeoModel({
    pageType,
    defaults,
    data,
    otherLanguages,
  })

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.imageUrl} />
      <meta name="robots" content={seo.metaRobots} />

      <script type="application/ld+json">
        {JSON.stringify(seo.schemaOrgJSONLD)}
      </script>

      <link rel="canonical" href={seo.canonicalUrl} />
      <meta property="og:site_name" content={defaults.title} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:type" content={seo.ogType} />
      <meta property="og:title" content={seo.ogTitle} />
      <meta property="og:description" content={seo.ogDescription} />
      <meta property="og:image" content={seo.imageUrl} />
      {seo.publishedTime ? (
        <meta property="article:published_time" content={seo.publishedTime} />
      ) : null}
      {seo.fbAppID ? <meta property="fb:app_id" content={seo.fbAppID} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.ogTitle} />
      <meta name="twitter:description" content={seo.ogDescription} />
      <meta name="twitter:image" content={seo.imageUrl} />
      {seo.faviconUrl ? (
        <link rel="shortcut icon" type="image/x-icon" href={seo.faviconUrl} />
      ) : null}
      {seo.alternateLinks.map((link) => (
        <link
          key={link.hrefLang}
          rel="alternate"
          href={link.href}
          hrefLang={link.hrefLang}
        />
      ))}
    </>
  )
}

export default SEO
