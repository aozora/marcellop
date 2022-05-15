/* eslint-disable indent */
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Image, QueryListenerOptions, StructuredText, useQuerySubscription } from 'react-datocms';
import highlight from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import React, { useEffect, useRef } from 'react';
import { getPublishedDateFormatted, getPublishedDateShort } from '@/lib/helpers';
import { GetStaticProps } from 'next';
import { request, RequestType } from '@/lib/datocms';
import { postsQuery } from '@/queries/posts.query';
import { postBySlugQuery } from '@/queries/postBySlug.query';
import 'highlight.js/styles/base16/darcula.css';
import { Post } from '../../../src/lib/types/index';

highlight.registerLanguage('javascript', javascript);

export type PostProps = {
  subscription: QueryListenerOptions<any, any>;
};

export type PostData = {
  post: Post;
};

export default function PostBySlug({ subscription }: PostProps): JSX.Element {
  const router = useRouter();
  const postRef = useRef();
  const isClient = typeof window !== 'undefined' && window.addEventListener;
  // implement client-side updates of the page as soon as the content changes
  // see: https://github.com/datocms/react-datocms/#live-real-time-updates
  const { data } = useQuerySubscription(subscription);
  const { post }: PostData = data;

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
                  <time itemProp="datePublished" dateTime={getPublishedDateShort(post.publishedAt)}>
                    {getPublishedDateFormatted(post.publishedAt)}
                  </time>
                </p>
              </div>
            </header>

            {post.cover && (
              <figure>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
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
                  // eslint-disable-next-line no-underscore-dangle
                  switch (record.__typename) {
                    case 'ImageBlockRecord':
                      // @ts-ignore
                      return (
                        // eslint-disable-next-line jsx-a11y/alt-text
                        <Image
                          data={{
                            ...record.image.responsiveImage
                          }}
                        />
                      );
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

export const getStaticProps: GetStaticProps = async ({ params, preview }) => {
  const graphqlRequest: RequestType = {
    query: postBySlugQuery,
    preview,
    variables: {
      slug: params.slug
    }
  };

  // const data = (await getPostBySlug(params.slug, preview)) || null;

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.DATOCMS_API_TOKEN
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest)
          }
    }
  };
};

export async function getStaticPaths() {
  const graphqlRequest: RequestType = {
    query: postsQuery,
    preview: false
  };

  const initialData = await request(graphqlRequest);
  const { allPosts } = initialData;

  return {
    // paths: allPosts?.map((post) => `/writings/${post.slug}`) || [],
    paths: allPosts?.map(post => ({ params: { slug: post.slug } })) || [],
    fallback: false
  };
}
