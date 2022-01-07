/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getPublishedDateFormatted, getPublishedDateShort } from '@/lib/helpers';

const PostAbstract = ({ post }): JSX.Element => (
  <article
    aria-labelledby={`aria-article-${post.id}`}
    className="post"
    itemScope
    itemType="http://http://schema.org/BlogPosting"
  >
    <header>
      <h2 id={`aria-article-${post.id}`} itemProp="name">
        <Link href={`/writings/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h2>

      <div className="post__metadata">
        <span>Posted in &nbsp;</span>

        {post.category && (
          <p>
            <span>{post.category}</span>
          </p>
        )}
        <span>&nbsp; on &nbsp;</span>
        <p>
          <time itemProp="datePublished" dateTime={getPublishedDateShort(post.publishedAt)}>
            {getPublishedDateFormatted(post.publishedAt)}
          </time>
        </p>
      </div>
    </header>

    {/* eslint-disable-next-line react/no-danger */}
    {/* <div className="post__body" dangerouslySetInnerHTML={{ __html: post.body }} /> */}
  </article>
);

export default PostAbstract;
