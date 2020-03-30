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
        filter: { frontmatter:  { contentType: { in: ["articles"] } } }
        sort: { fields: [frontmatter___publishTime], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              contentType
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
    const postsGroupedByType = {};
    const { data: { posts: { edges: posts } } } = result;
    posts.forEach(({ node: { frontmatter: post } }) => {
      const { contentType } = post;
      postsGroupedByType[contentType] = postsGroupedByType[contentType] || [];
      postsGroupedByType[contentType].push(post);
    });
    Object.keys(postsGroupedByType).forEach(contentType => {
      // const contentByTags = {};
      const contentItems = postsGroupedByType[contentType];
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
        const url = `${contentType}/${pagePath}`;
        console.log('creating a page', url);
        createPage({
          path: url,
          component: path.resolve('src/templates/article.js'),
          context: {
            contentType,
            slug: pagePath
          }
        });
      });
    });
  });
};
