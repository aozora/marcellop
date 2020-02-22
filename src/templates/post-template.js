import React from 'react';
import { graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Layout from '../components/layout';
import Post from '../components/Post';

// eslint-disable-next-line react/prop-types
export default ({ data }) => (
  <Layout>
    {/* eslint-disable-next-line react/prop-types */}
    <HelmetDatoCms seo={data.datoCmsPost.seoMetaTags}/>
    {/* eslint-disable-next-line react/prop-types */}
    <Post post={data.datoCmsPost} />
  </Layout>
);

export const query = graphql`
  query PostQuery($slug: String!) {
    datoCmsPost (slug: { eq: $slug }){
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      slug
      body
      cover {
        alt
        url
        fluid(imgixParams: {fm: "jpg", auto: "compress"}) {
          ...GatsbyDatoCmsSizes
        }
      }
      meta {
        publishedAt
      }
    }
  }
`;
