import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const Post = ({ post }) => {

  const getPublishedDateFormatted = () => format(
    new Date(post.meta.publishedAt),
    'MMMM do yyyy'
  );

  const getPublishedDateShort = () => format(
    new Date(post.meta.publishedAt),
    'yyyy-MM-dd'
  );

  return (
    <article
      aria-labelledby={`aria-article-${post.id}`}
      className="post"
      itemScope
      itemType="http://http://schema.org/BlogPosting"
    >
      <header>
        <h1 id={`aria-article-${post.id}`} itemProp="name">{post.title}</h1>

        <div className="post__metadata">
          <span className="visuallyhidden">Posted </span>

          {post.category && (
            <p>
              <em className="visuallyhidden">in </em>
              <span>{post.category}</span>
            </p>
          )}
          <p>
            <span className="visuallyhidden"> on </span>
            <time
              itemProp="datePublished"
              dateTime={getPublishedDateShort()}
            >
              {getPublishedDateFormatted()}
            </time>
          </p>
        </div>
      </header>

      {post.cover && (
        <figure>
          <Img
            fluid={post.cover.fluid}
            alt={post.cover.alt}
          />
          <figcaption>{post.cover.alt}</figcaption>
        </figure>
      )}

      {/* eslint-disable-next-line react/no-danger */}
      <div className="post__body" dangerouslySetInnerHTML={{ __html: post.bodyNode.childMarkdownRemark.html }}/>

      <footer>
        <br/>
        <p>Sincerely,</p>
        <p className="post__signature">Marcello</p>
      </footer>
    </article>
  );
};

Post.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired
};

export default Post;
