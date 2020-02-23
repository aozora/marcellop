import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PostAbstract from '../components/PostAbstract';
import Layout from '../components/layout';

const indexQuery = graphql`
  query PostsQuery {
    allDatoCmsPost(sort: {order: DESC, fields: meta___publishedAt}) {
      edges {
        node {
          id
          title
          slug
          bodyNode {
            childMarkdownRemark {
              html
              excerpt
            }
          }
          seoMetaTags {
            ...GatsbyDatoCmsSeoMetaTags
          }
          meta {
            publishedAt
          }
        }
      }
    }
  }
`;


const Writings = () => {
  const { allDatoCmsPost } = useStaticQuery(indexQuery);

  return (
    <Layout>
      <section className="posts">
        <h1>Writings</h1>

        <div>
          {
            allDatoCmsPost.edges.map(({ node: post }) => <PostAbstract key={post.id} post={post}/>)
            // <!--      <div class="posts__pagination">-->
            //   <!--        <a href="#">Older entries</a>-->
            //   <!--        <a href="#">Newer entries</a>-->
            //   <!--      </div>-->
          }
        </div>

        {!allDatoCmsPost && (
          <div>
            <p className="sorry">Nothing new here, please come back later...</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Writings;
