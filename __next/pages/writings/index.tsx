/* eslint-disable indent */
import React from 'react';
import PostAbstract from '@/components/PostAbstract';
import { generateRSS } from '@/lib/rss-utils';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { request, RequestType } from '@/lib/datocms';
import { postsQuery } from '@/queries/posts.query';
import { QueryListenerOptions, useQuerySubscription } from 'react-datocms';
import { Post } from '../../../src/types/index';

export type WritingsProps = {
  subscription: QueryListenerOptions<any, any>;
};

export type WritingsData = {
  allPosts: Array<Post>;
};

export default function Writings({ subscription }: WritingsProps) {
  const router = useRouter();
  // implement client-side updates of the page as soon as the content changes
  // see: https://github.com/datocms/react-datocms/#live-real-time-updates
  const { data } = useQuerySubscription(subscription);
  const { allPosts }: WritingsData = data;

  return (
    <section key={router.route} className="posts">
      <h1>Writings</h1>

      <div>
        {
          allPosts && allPosts.map(post => <PostAbstract key={post.id} post={post} />)
          // <!--      <div class="posts__pagination">-->
          //   <!--        <a href="#">Older entries</a>-->
          //   <!--        <a href="#">Newer entries</a>-->
          //   <!--      </div>-->
        }
      </div>

      {!allPosts && (
        <div>
          <p className="sorry">Nothing new here, please come back later...</p>
        </div>
      )}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const graphqlRequest: RequestType = {
    query: postsQuery,
    preview
  };

  const initialData = await request(graphqlRequest);
  await generateRSS(initialData.allPosts);

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData,
            token: process.env.DATOCMS_API_TOKEN
          }
        : {
            enabled: false,
            initialData
          }
    }
  };
};
