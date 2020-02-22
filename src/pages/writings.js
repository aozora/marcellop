import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import PostAbstract from '../components/PostAbstract';

const indexQuery = graphql`
  query PostsQuery {
    allDatoCmsPost(sort: {order: DESC, fields: meta___publishedAt}) {
      edges {
        node {
          id
          title
          slug
          body
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
  );
};

export default Writings;
