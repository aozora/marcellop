/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Image } from 'react-datocms';
import {
  getAllMenu,
  getAllPosts,
  // getAllPostsWithSlug,
  getPostBySlug,
  getSiteData
} from '@/lib/api';
import React from 'react';
import {
  getPublishedDateFormatted,
  getPublishedDateShort
} from '@/lib/helpers';
import sanitizeHtml from 'sanitize-html';

export default function Post({ /* preview, site, menu, */ post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <article
            aria-labelledby={`aria-article-${post.id}`}
            className="post"
            itemScope
            itemType="http://http://schema.org/BlogPosting"
          >
            <header>
              <h1 id={`aria-article-${post.id}`} itemProp="name">
                {post.title}
              </h1>

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
                    dateTime={getPublishedDateShort(post.publishedAt)}
                  >
                    {getPublishedDateFormatted(post.publishedAt)}
                  </time>
                </p>
              </div>
            </header>

            {post.cover && (
              <figure>
                <Image
                  data={{
                    ...post.cover.responsiveImage
                  }}
                />
                <figcaption>{post.cover.responsiveImage.alt}</figcaption>
              </figure>
            )}

            {/* eslint-disable-next-line react/no-danger */}
            <div
              className="post__body"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(post.body, {
                  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
                    'img',
                    'video'
                  ]),
                  allowedAttributes: {
                    ...sanitizeHtml.defaults.allowedAttributes,
                    video: ['src', 'controls']
                  }
                })
              }}
            />

            <footer>
              <br />
              <p>Sincerely,</p>
              <p className="post__signature">Marcello</p>
            </footer>
          </article>
        </>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const menu = (await getAllMenu(preview)) || null;
  const site = (await getSiteData(preview)) || null;
  const data = (await getPostBySlug(params.slug, preview)) || null;

  return {
    props: {
      preview,
      site,
      menu,
      post: data.post
    }
  };
}

export async function getStaticPaths() {
  // const allPosts = await getAllPostsWithSlug();
  const allPosts = await getAllPosts();
  // console.log('*** DEBUG allPosts ***', allPosts);

  return {
    // paths: allPosts?.map((post) => `/writings/${post.slug}`) || [],
    paths: allPosts?.map(post => ({ params: { slug: post.slug } })) || [],
    fallback: false
  };
}
