const config = require('./src/config');

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = config.url,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
  siteMetadata: {
    title: 'Психолог Олеся Бобруйко',
    siteUrl
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/assets`
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    'gatsby-plugin-less',
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-K8ZHH8G',
        includeInDevelopment: false
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/articles_files`,
        name: 'articles'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/homepage`,
        name: 'homepage'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/questionnaires`,
        name: 'questionnaires'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/resources`,
        name: 'resources'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'settings',
        path: `${__dirname}/content/settings`
      }
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'webp'],
          placeholder: 'blurred',
          quality: 100
        }
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-relative-images-v2'
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 930,
              showCaptions: true,
              backgroundColor: 'transparent' // required to display blurred image first
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: 'GPTBot', Disallow: '/' }, { userAgent: '*', Allow: '/' }],
            sitemap: `${siteUrl}/sitemap-index.xml`
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
        }`,
        excludes: ['/en/questionnaires/mbi-general-survey', '/404/', '/404.html', '/en/404.html', '/ru/404.html', '/404.html', '/ru/404/', '/en/404/', '/en/dev-404-page/', '/en/dev-404-page/', '/dev-404-page/'],
        resolveSiteUrl: () => siteUrl,
        serialize: ({ path }) => ({
          url: `${siteUrl}${path}`,
          changefreq: 'weekly',
          priority: 0.6
        })
      }
    }
  ]
};
