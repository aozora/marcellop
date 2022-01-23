import React from 'react';
import Link from 'next/link';
import { getPublishedDateFormatted, getPublishedDateShort } from '@/lib/helpers';
import { Post } from '../../src/types/index';

export type PostAbstractProps = {
  post: Post;
};

const PostAbstract = ({ post }: PostAbstractProps): JSX.Element => (
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
  </article>
);

export default PostAbstract;
