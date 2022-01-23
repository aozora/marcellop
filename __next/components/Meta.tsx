import { renderMetaTags } from 'react-datocms';
import Head from 'next/head';
import React from 'react';
import { CMS_NAME } from '@/lib/constants';

export default function Meta({ meta }): JSX.Element {
  return (
    <Head>
      <title>{CMS_NAME}</title>
      {meta && renderMetaTags(meta)}
      <link rel="alternate" type="application/rss+xml" title="Articles RSS" href="/rss" />
    </Head>
  );
}
