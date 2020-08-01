import React from 'react';
import Layout from '@/components/layout';
import Head from 'next/head';
import { AnimatePresence } from 'framer-motion';
import { CMS_NAME } from '@/lib/constants';
import '@/styles/app.scss';

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout site={pageProps.site} page={pageProps.page} menu={pageProps.menu}>
      <Head>
        <title>{CMS_NAME}</title>
      </Head>

      {/* <AnimatePresence exitBeforeEnter> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} key={router.route} />
      {/* </AnimatePresence> */}
    </Layout>
  );
}

export default MyApp;
