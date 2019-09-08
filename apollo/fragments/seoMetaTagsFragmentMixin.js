import gql from 'graphql-tag';

export const DatoCmsSeoMetaTags = gql`
  fragment DatoCmsSeoMetaTags on Tag {
    attributes
    content
    tag
  }
`;
