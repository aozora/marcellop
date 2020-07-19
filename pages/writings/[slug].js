import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { Image } from 'react-datocms';
import { format } from 'date-fns';
import Layout from '@/components/layout';
import {
  getAllMenu, getAllPostsWithSlug, getPostBySlug, getSiteData
} from '@/lib/api';
import Head from 'next/head';
import { CMS_NAME } from '@/lib/constants';
import React from 'react';
import { getPublishedDateFormatted, getPublishedDateShort } from '../../lib/helpers';

export default function Post({
  preview, site, menu, post
}) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview} site={site} page={post} menu={menu}>
      <Head>
        <title>
          {CMS_NAME}
        </title>
      </Head>

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
            <div className="post__body" dangerouslySetInnerHTML={{ __html: post.body }} />

            <footer>
              <br />
              <p>Sincerely,</p>
              <p className="post__signature">Marcello</p>
            </footer>
          </article>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const menu = (await getAllMenu(preview) || null);
  const site = (await getSiteData(preview) || null);
  const data = (await getPostBySlug(params.slug, preview) || null);

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
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts?.map((post) => `/writings/${post.slug}`) || [],
    fallback: false
  };
}
