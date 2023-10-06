const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

const Config = require('./src/config');

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
        path: localizedPath,
        context: {
          language: lang.title
        }
      });
    });

    resolve();
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
        filter: { fields:  { collection: { in: ["pages", "articles", "questionnaires"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
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
      questionnairesSettings: markdownRemark(frontmatter: {
        contentType: { eq: "questionnaires_settings" }
      }){
        frontmatter {
          questionnairesPerPage
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
        questionnairesSettings: {
          frontmatter: { questionnairesPerPage }
        },
        values: {
          frontmatter: { content: valuesData }
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
            ...nextLink,
            ...prevLink
          }
        });
      });
    });

    // Questionnaires list
    const { questionnaires } = postsGroupedByCollection;

    const questionnairesPerLanguage = {};

    Config.languages.forEach(l => { questionnairesPerLanguage[l.title] = []; });

    questionnaires.forEach(({ id, content }) => {
      content.forEach(({ language }) => {
        questionnairesPerLanguage[language].push(id);
      });
    });

    Object.keys(questionnairesPerLanguage).forEach(language => {
      const urlBase = `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}/questionnaires`;
      const getPageUrl = pageIdx => `${urlBase}${pageIdx ? `/${pageIdx + 1}` : ''}`;
      const questionnairesForLanguage = questionnairesPerLanguage[language];
      if (!questionnairesForLanguage.length) {
        return;
      }
      const numPages = Math.ceil(questionnairesForLanguage.length / questionnairesPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        const nextLink = i < numPages - 1 ? { nextLink: getPageUrl(i + 1) } : {};
        const prevLink = i > 0 ? { nextLink: getPageUrl(i - 1) } : {};
        createPage({
          path: getPageUrl(i),
          component: path.resolve('./src/templates/questionnairesListPage/index.js'),
          context: {
            language,
            ids: questionnairesForLanguage.slice(i * questionnairesPerPage, i * questionnairesPerPage + questionnairesPerPage),
            numPages,
            currentPage: i + 1,
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
      valuesLanguagesLinks[language] = `${c.language === defaultLanguage ? '' : `/${language}`}/values`;
    });

    valuesData.forEach(({ language }) => {
      createPage({
        path: `${language === defaultLanguage ? '' : `/${language.toLowerCase()}`}/values`,
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
  });
};
