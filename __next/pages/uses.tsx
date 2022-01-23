/* eslint-disable indent */
import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { request, RequestType } from '@/lib/datocms';
import { usesQuery } from '@/queries/uses.query';
import { QueryListenerOptions, useQuerySubscription } from 'react-datocms';
import { Use } from '../../src/types/index';

export type UsesProps = {
  subscription: QueryListenerOptions<any, any>;
};

export type UsesData = {
  allUses: Array<Use>;
};

export default function Uses({ subscription }: UsesProps) {
  const router = useRouter();
  // implement client-side updates of the page as soon as the content changes
  // see: https://github.com/datocms/react-datocms/#live-real-time-updates
  const { data } = useQuerySubscription(subscription);
  const { allUses }: UsesData = data;

  return (
    <section key={router.route} className="uses">
      <h1>Uses</h1>
      <p>Here the specifics of some piece of software or hardware I regularly use.</p>
      {allUses &&
        allUses.map(use => (
          <article key={use.id} className="uses__use">
            <h2>{use.title}</h2>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="job__description" dangerouslySetInnerHTML={{ __html: use.description }} />
          </article>
        ))}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const graphqlRequest: RequestType = {
    query: usesQuery,
    preview
  };

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
