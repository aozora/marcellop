/* eslint-disable */
import React, { useEffect } from 'react';
import Layout from '@/components/layout';
// app styles
import '@/styles/fonts.css';
import '@/styles/app.scss';
import Meta from '@/components/meta';
import Alert from '@/components/alert';

function MyApp({ Component, pageProps }) {
  const { site, page, menu, preview } = pageProps;

  return (
    <React.StrictMode>
      <Layout menu={menu}>
        <Meta meta={page && page.seo ? page.seo.concat(site.favicon) : site && site.favicon} />
        <a href="#main" tabIndex="0">
          Skip to main content
        </a>
        {preview && <Alert preview={preview} />}

        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  );
}

export default MyApp;
