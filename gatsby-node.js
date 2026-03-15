const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images-v2');

const Config = require('./src/config');

/**
 * Workaround for missing sitePage.context:
 * Used for generating sitemap with `gatsby-plugin-react-i18next` and `gatsby-plugin-sitemap` plugins
 * https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v3-to-v4/#field-sitepagecontext-is-no-longer-available-in-graphql-queries
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
  type SitePage implements Node {
    context: SitePageContext
  }
  type SitePageContext {
    i18n: i18nContext
  }
  type i18nContext {
      language: String,
      languages: [String],
      defaultLanguage: String,
      originalPath: String
      routed: Boolean
  }
  
  type MarkdownRemarkFrontmatterContent {
    language: String
    path: String
    url: String
    title: String
    subtitle: String
    seoTitle: String
    pageTitle: String
    description: String
    metaDescription: String
    fbTitle: String
    fbDescription: String
    image: File @fileByRelativePath
    imageAlt: String
    image_alt: String
    text: String
    thoughtLabel: String
    questions: [MarkdownRemarkFrontmatterContentQuestions]
    saveButtonText: String
    printTitle: String
    bookConsultationButtonText: String
    bookConsultationButtonLinkPrivate: String
    bookConsultationButtonLinkOpenup: String
    useWhiteForNav: Boolean
  }
  
  type MarkdownRemarkFrontmatterContentQuestions {
    question: String
    text: String
    name: String
    subscale: String
    minScore: Int
    answers: [MarkdownRemarkFrontmatterContentQuestionsAnswers]
  }
  
  type MarkdownRemarkFrontmatterContentQuestionsAnswers {
    text: String
    value: Int
  }

  type MarkdownRemarkFrontmatterContentRecommendedContent {
    path: String
  }
`);
};

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  return new Promise(resolve => {
    deletePage(page);

    Config.languages.map(lang => {
      const localizedPath = lang.isDefault
        ? page.path
        : lang.title.toLocaleLowerCase() + page.path;

      return createPage({
        ...page,
        path: localizedPath.trim(),
        context: {
          language: lang.title
        }
      });
    });

    resolve();
  });
};

exports.onCreateDevServer = ({ app }) => {
  const adminIndexPath = path.join(__dirname, 'static', 'admin', 'index.html');

  app.get(['/admin', '/admin/'], (_req, res) => {
    res.sendFile(adminIndexPath);
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });
    const parent = getNode(node.parent);
    createNodeField({
      name: 'slug',
      node,
      value
    });
    createNodeField({
      node,
      name: 'collection',
      value: parent.sourceInstanceName
    });
  }
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      posts: allMarkdownRemark (
        filter: { fields:  { collection: { in: ["pages", "articles", "questionnaires", "resources"] } } }
        sort: { frontmatter: { publishTime: DESC } }
      ) {
        edges {
          node {
            id
            fields {
              collection
            }
            frontmatter {
              title
              content {
                language
                path
              }
            }
          }
        }
      }
      articlesSettings: markdownRemark(frontmatter: {
        contentType: { eq: "articles_settings" }
      }){
        frontmatter {
          articlesPerPage
        }
      }
      resourcesSettings: markdownRemark(frontmatter: {
        contentType: { eq: "resources_settings" }
      }){
        frontmatter {
          perPage
        }
      }
      values: markdownRemark(frontmatter: {
        contentType: { eq: "values" }
      }){
        frontmatter {
          content {
            language
          }
        }
      }
      socraticQuestioning: markdownRemark(frontmatter: {
        contentType: { eq: "socratic_questioning" }
      }){
        frontmatter {
          content {
            language
            path
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const postsGroupedByCollection = {};
    const {
      data: {
        posts: { edges: posts },
        articlesSettings: {
          frontmatter: { articlesPerPage }
        },
        resourcesSettings: {
          frontmatter: { perPage: resourcesPerPage }
        },
        values: {
          frontmatter: { content: valuesData }
        },
        socraticQuestioning: {
          frontmatter: { content: sqData }
        }
      }
    } = result;
    posts.forEach(({ node: { id, fields: { collection }, frontmatter: post } }) => {
      postsGroupedByCollection[collection] = postsGroupedByCollection[collection] || [];
      postsGroupedByCollection[collection].push({ id, ...post });
    });
    const defaultLanguage = Config.languages.find(l => l.isDefault).title;
    Object.keys(postsGroupedByCollection).forEach(collection => {
      const contentItems = postsGroupedByCollection[collection];

      contentItems.forEach(({ content }) => {
        // if (content[0].path.endsWith('/resources/values')) {
        //   return;
        // }
        const allLinks = {};
        content.forEach(c => {
          const language = c.language.toLowerCase();
          allLinks[language] = `${c.language === defaultLanguage ? '' : `/${language}`}${c.path}`;
        });
        Config.languages.forEach(l => {
          const thisLocaleContent = content.find(c => c.language === l.title);
          if (!thisLocaleContent) {
            return;
          }
          const { path: pagePath } = thisLocaleContent;
          createPage({
            path: `${l.isDefault ? '' : `/${l.title.toLocaleLowerCase()}`}${pagePath}`,
            component: path.resolve(`src/templates/${collection}/index.js`),
            context: {
              slug: pagePath,
              language: l.title,
              otherLanguages: allLinks
            }
          });
        });
      });
    });

    // Articles list
    const { articles } = postsGroupedByCollection;

    const articlesPerLanguage = {};

    Config.languages.forEach(l => { articlesPerLanguage[l.title] = []; });

    articles.forEach(({ id, content }) => {
      content.forEach(({ language }) => {
        articlesPerLanguage[language].push(id);
      });
    });

    // Build otherLanguages mapping for articles list pages
    const articlesListLanguagesLinks = {};
    Config.languages.forEach(l => {
      const language = l.title.toLowerCase();
      articlesListLanguagesLinks[language] = `${l.isDefault ? '' : `/${language}`}/articles`;
    });

    Object.keys(articlesPerLanguage).forEach(language => {
      const urlBase = `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}/articles`;
      const getPageUrl = pageIdx => `${urlBase}${pageIdx ? `/${pageIdx + 1}` : ''}`;
      const articles = articlesPerLanguage[language];
      if (!articles.length) {
        return;
      }
      const numPages = Math.ceil(articles.length / articlesPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        const nextLink = i < numPages - 1 ? { nextLink: getPageUrl(i + 1) } : {};
        const prevLink = i > 0 ? { nextLink: getPageUrl(i - 1) } : {};
        createPage({
          path: getPageUrl(i),
          component: path.resolve('./src/templates/articlesListPage/index.js'),
          context: {
            language,
            ids: articles.slice(i * articlesPerPage, i * articlesPerPage + articlesPerPage),
            numPages,
            currentPage: i + 1,
            otherLanguages: articlesListLanguagesLinks,
            ...nextLink,
            ...prevLink
          }
        });
      });
    });

    // Values
    const valuesLanguagesLinks = {};
    valuesData.forEach(c => {
      const language = c.language.toLowerCase();
      valuesLanguagesLinks[language] = `${c.language === defaultLanguage ? '' : `/${language}`}/resources/values`;
    });

    valuesData.forEach(({ language }) => {
      createPage({
        path: `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}/resources/values`,
        component: path.resolve('./src/templates/values/index.js'),
        context: {
          language,
          otherLanguages: valuesLanguagesLinks
        }
      });
    });

    createPage({
      path: '/values-print',
      component: path.resolve('./src/templates/values/print.js')
    });


    // Socratic Questioning
    const sqLanguagesLinks = {};
    sqData.forEach(c => {
      const language = c.language.toLowerCase();
      sqLanguagesLinks[language] = c.language === defaultLanguage ? c.path : `/${language}${c.path}`;
    });

    sqData.forEach(({ language, path: pagePath }) => {
      createPage({
        path: language === defaultLanguage ? pagePath : `/${language.toLowerCase()}${pagePath}`,
        component: path.resolve('./src/templates/socratic-questioning/index.js'),
        context: {
          language,
          otherLanguages: sqLanguagesLinks
        }
      });
    });


    // Resources list
    const { resources } = postsGroupedByCollection;

    const resourcesPerLanguage = {};

    Config.languages.forEach(l => { resourcesPerLanguage[l.title] = []; });

    resources.forEach(({ id, content }) => {
      content.forEach(({ language }) => {
        resourcesPerLanguage[language].push(id);
      });
    });

    // Build otherLanguages mapping for resources list pages
    const resourcesListLanguagesLinks = {};
    Config.languages.forEach(l => {
      const language = l.title.toLowerCase();
      resourcesListLanguagesLinks[language] = `${l.isDefault ? '' : `/${language}`}/resources`;
    });

    Object.keys(resourcesPerLanguage).forEach(language => {
      const urlBase = `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}/resources`;
      const getPageUrl = pageIdx => `${urlBase}${pageIdx ? `/${pageIdx + 1}` : ''}`;
      const resources = resourcesPerLanguage[language];
      if (!resources.length) {
        return;
      }
      const numPages = Math.ceil(resources.length / articlesPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        const nextLink = i < numPages - 1 ? { nextLink: getPageUrl(i + 1) } : {};
        const prevLink = i > 0 ? { nextLink: getPageUrl(i - 1) } : {};
        createPage({
          path: getPageUrl(i),
          component: path.resolve('./src/templates/resourcesListPage/index.js'),
          context: {
            language,
            ids: articles.slice(i * articlesPerPage, i * articlesPerPage + articlesPerPage),
            numPages,
            currentPage: i + 1,
            otherLanguages: resourcesListLanguagesLinks,
            ...nextLink,
            ...prevLink
          }
        });
      });
    });
  });
};
