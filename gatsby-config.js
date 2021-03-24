module.exports = {
  siteMetadata: {
    title: 'Психолог Олеся Бобруйко',
    siteUrl: 'https://obobruiko.com'
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
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`
      }
    },
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
        name: 'settings',
        path: `${__dirname}/content/settings`
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Психолог Олеся Бобруйко',
        short_name: 'Олеся Бобруйко',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#fff',
        display: 'standalone',
        icon: 'static/assets/icon-512px.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-figure-caption',
            options: { figureClassName: 'md-figure' }
          },
          {
            resolve: 'gatsby-remark-relative-images'
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 930,
              quality: 100,
              backgroundColor: 'transparent' // required to display blurred image first
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{
          userAgent: '*',
          disallow: '/'
        }]
      }
    }
  ]
};
