/* eslint-disable */
import React, { useEffect } from 'react';
import Layout from '@/components/layout';
// app styles
import '@/styles/fonts.css';
import '@/styles/app.scss';
import Meta from '@/components/meta';
import Alert from '@/components/alert';
// import { AnimatePresence } from 'framer-motion';
import useStore from '../helpers/store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Dom from '@/components/layout/dom';
import partition from '../helpers/partition';

const LCanvas = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false
});

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, c => {
    if (c.props.r3f && c.props.r3f === true) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  );
};

function MyApp({ Component, pageProps }) {
  const { site, page, menu, preview } = pageProps;
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  const child = Component(pageProps).props.children;

  return (
    <Layout menu={menu}>
      <Meta meta={page && page.seo ? page.seo.concat(site.favicon) : site && site.favicon} />
      <a href="#main" tabIndex="0">
        Skip to main content
      </a>
      {preview && <Alert preview={preview} />}

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
