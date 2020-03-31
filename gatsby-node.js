const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

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
        filter: { fields:  { collection: { in: ["articles", "pages"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
        edges {
          node {
            fields {
              collection
            }
            frontmatter {
              path
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
    Object.keys(postsGroupedByCollection).forEach(collection => {
      // const contentByTags = {};
      const contentItems = postsGroupedByCollection[collection];
      // const contentTypeTags = Object.keys(contentByTags);
      // const template = contentType === 'advice' ? 'advice' : 'articles';

      // const postsPerPage = config[contentType].perPage;
      // const numPages = Math.ceil(contentItems.length / postsPerPage);
      // Array.from({ length: numPages }).forEach((_, i) => {
      //   createPage({
      //     path: `/${contentType}${i ? `/${i + 1}` : ''}`,
      //     component: path.resolve(`./src/templates/${template}ListPage.js`),
      //     context: {
      //       limit: postsPerPage,
      //       skip: i * postsPerPage,
      //       numPages,
      //       currentPage: i + 1,
      //       contentType,
      //       tags: contentTypeTags
      //     }
      //   });
      // });
      contentItems.forEach(({ path: pagePath }) => {
        createPage({
          path: pagePath,
          component: path.resolve(`src/templates/${collection}.js`),
          context: {
            slug: pagePath
          }
        });
      });
    });
  });
};
