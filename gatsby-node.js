// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // eslint-disable-next-line
  const createPosts = new Promise((resolve, reject) => {
    try {
      graphql(`
        {
          allDatoCmsPost {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then((result) => {
        // result.data.allDatoCmsWork.edges.map(({ node: work }) => {
        //   createPage({
        //     path: `works/${work.slug}`,
        //     component: path.resolve(`./src/templates/work.js`),
        //     context: {
        //       slug: work.slug,
        //     },
        //   })
        // })
        const posts = result.data.allDatoCmsPost.edges;
        // eslint-disable-next-line array-callback-return
        posts.map(({ node: post }) => {
          createPage({
            path: `/writings/${post.slug}`,
            component: path.resolve('./src/templates/post-template.js'),
            context: {
              slug: post.slug
            }
          });
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });

  // eslint-disable-next-line
  return Promise.all([createPosts]);
};
