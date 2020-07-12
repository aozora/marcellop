import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
// import Seo from './Seo';
import { Link } from 'gatsby';
// import stripHtml from 'string-strip-html';

const PostAbstract = ({ post }) => {
  const getPublishedDateFormatted = () => format(
    new Date(post.meta.publishedAt),
    'MMMM do yyyy'
  );

  const getPublishedDateShort = () => format(
    new Date(post.meta.publishedAt),
    'yyyy-MM-dd'
  );

  // const getAbstract = () => {
  //   const text = stripHtml(post.body);
  //   if (text.length >= 200) {
  //     return `${text.substr(0, 200)}...`;
  //   }
  //   return text;
  // };

  return (
    <article
      aria-labelledby={`aria-article-${post.id}`}
      className="post"
      itemScope
      itemType="http://http://schema.org/BlogPosting"
    >
      <header>
        <h2 id={`aria-article-${post.id}`} itemProp="name">
          <Link to={`/writings/${post.slug}`}>{post.title}</Link>
        </h2>

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

      {/* eslint-disable-next-line react/no-danger */}
      <div className="post__body" dangerouslySetInnerHTML={{ __html: post.bodyNode.childMarkdownRemark.excerpt }}/>
    </article>
  );
};

PostAbstract.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  post: PropTypes.object.isRequired
};

export default PostAbstract;
