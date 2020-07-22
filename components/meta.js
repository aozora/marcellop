import { renderMetaTags } from 'react-datocms';
import Head from 'next/head';
import React from 'react';

export default function Meta({ meta }) {
  return (
    <Head>
      {meta && renderMetaTags(meta)}
      <link rel="alternate" type="application/rss+xml" title="Articles RSS" href="/rss" />
    </Head>
  );
}
