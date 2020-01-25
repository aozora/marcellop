// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */
// const path = require('path');
//
// exports.createPages = async ({ graphql, actions }) => {
//   const { createPage } = actions;
//
//   // eslint-disable-next-line
//   const createBlogsPosts = new Promise((resolve, reject) => {
//     try {
//       graphql(`
//         {
//           allDatoCmsWriting {
//             nodes {
//               slug
//             }
//           }
//         }
//       `).then((res) => {
//         const posts = res.data.allDatoCmsWriting.nodes;
//         posts.map((post) => {
//           const { slug } = post;
//           createPage({
//             path: `/blog/${slug}`,
//             component: path.resolve('./src/templates/BlogPost.js'),
//             context: {
//               slug
//             }
//           });
//         });
//         resolve();
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
//
//   // eslint-disable-next-line
//   return Promise.all([createBlogsPosts]);
// };
