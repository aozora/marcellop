import React from 'react';
import Layout from '@/components/layout';

// app styles
import '@/styles/fonts.css';
import '@/styles/app.scss';
import PageTransition from '@/components/PageTransition';
import Meta from '@/components/meta';
import Alert from '@/components/alert';
import Header from '@/components/Header';

function MyApp({ Component, pageProps, router }) {
  const { site, page, menu, preview } = pageProps;

  return (
    <Layout>
      <Meta
        meta={
          page && page.seo
            ? page.seo.concat(site.favicon)
            : site && site.favicon
        }
      />
      <a href="#main" tabIndex="0">
        Skip to main content
      </a>
      {preview && <Alert preview={preview} />}
      <Header menu={menu} />

      <PageTransition path={router.pathname}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} key={router.route} />
      </PageTransition>
    </Layout>
  );
}

export default MyApp;
