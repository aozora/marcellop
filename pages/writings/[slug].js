/* eslint-disable react/no-danger */
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Image, StructuredText } from 'react-datocms';
import highlight from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/darcula.css';
import {
  getAllMenu,
  getAllPosts,
  // getAllPostsWithSlug,
  getPostBySlug,
  getSiteData
} from '@/lib/api';
import React, { useEffect, useRef } from 'react';
import {
  getPublishedDateFormatted,
  getPublishedDateShort
} from '@/lib/helpers';
import sanitizeHtml from 'sanitize-html';

highlight.registerLanguage('javascript', javascript);

export default function Post({ /* preview, site, menu, */ post }) {
  const router = useRouter();
  const postRef = useRef();
  const isClient = typeof window !== 'undefined' && window.addEventListener;

  useEffect(() => {
    if (isClient && postRef.current) {
      highlight.highlightAll();
    }
  }, [isClient]);

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
            ref={postRef}
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
            {/* <div */}
            {/*  className="post__body" */}
            {/*  dangerouslySetInnerHTML={{ */}
            {/*    __html: sanitizeHtml(post.body, { */}
            {/*      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ */}
            {/*        'img', */}
            {/*        'video', */}
            {/*        'pre', */}
            {/*        'code' */}
            {/*      ]), */}
            {/*      allowedAttributes: { */}
            {/*        ...sanitizeHtml.defaults.allowedAttributes, */}
            {/*        video: ['src', 'controls'], */}
            {/*        code: ['class'] */}
            {/*      } */}
            {/*    }) */}
            {/*  }} */}
            {/* /> */}

            {/* <div */}
            {/*  className="post__body" */}
            {/*  dangerouslySetInnerHTML={{ */}
            {/*    __html: post.body */}
            {/*  }} */}
            {/* /> */}

            <div className="post__body">
              <StructuredText
                data={post.body2}
                renderBlock={({ record }) => {
                  switch (record.__typename) {
                    case 'ImageBlockRecord':
                      return <Image data={record.image.responsiveImage} />;
                    case 'VideoBlockRecord':
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      return <video controls src={record.video.url} />;
                    default:
                      return null;
                  }
                }}
              />
            </div>

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
      post: data.post,
      page: data.post
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
