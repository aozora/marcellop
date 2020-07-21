import React from 'react';
import Layout from '@/components/layout';
import '@/styles/app.scss';
import Head from 'next/head';
import { CMS_NAME } from '@/lib/constants';

function MyApp({ Component, pageProps }) {
  return (
    <Layout site={pageProps.site} page={pageProps.page} menu={pageProps.menu}>
      <Head>
        <title>
          {CMS_NAME}
        </title>
      </Head>

      {/* // eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
