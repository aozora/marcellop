import gql from 'graphql-tag';

// export default {
//   fragments: {
//     seoMetaTags: gql`
//       fragment _seoMetaTags on Tag {
//         attributes
//         content
//         tag
//       }
//     `
//   }
// };

export const datoCmsSeoMetaTags = gql`
  fragment datoCmsSeoMetaTags on Tag {
    attributes
    content
    tag
  }
`;
