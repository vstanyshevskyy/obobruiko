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
        filter: { fields:  { collection: { in: ["pages", "articles"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
        edges {
          node {
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
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const postsGroupedByCollection = {};
    const { data: { posts: { edges: posts } } } = result;
    posts.forEach(({ node: { fields: { collection }, frontmatter: post } }) => {
      postsGroupedByCollection[collection] = postsGroupedByCollection[collection] || [];
      postsGroupedByCollection[collection].push(post);
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
            component: path.resolve(`src/templates/${collection}.js`),
            context: {
              slug: pagePath,
              language: l.title,
              otherLanguages: allLinks
            }
          });
        });
      });
    });
  });
};
