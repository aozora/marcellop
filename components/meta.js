import { renderMetaTags } from 'react-datocms';
import Head from 'next/head';
import React from 'react';

export default function Meta({ meta }) {
  return (
    <Head>
      {renderMetaTags(meta)}
    </Head>
  );
}
