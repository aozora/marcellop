/* eslint-disable */
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { AppProps } from 'next/app';
import { PageProvider, PageState } from '@/components/PageProvider';
import '@/styles/fonts.css';
import '@/styles/app.scss';

function App({ Component, pageProps, router }: AppProps): JSX.Element {
  const { initialData } = pageProps.subscription;
  const { site, menu } = initialData;
  const initialPageState: PageState = {
    site,
    menu
  };

  return (
    <PageProvider initialState={initialPageState}>
      <Layout preview={pageProps.subscription.preview} pageProps={pageProps}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </PageProvider>

    // <Layout menu={menu}>
    //   <Meta meta={page && page.seo ? page.seo.concat(site.favicon) : site && site.favicon} />
    //   <a href="#main" tabIndex="0">
    //     Skip to main content
    //   </a>
    //   {preview && <Alert preview={preview} />}
    //
    //   <Component {...pageProps} />
    // </Layout>
  );
}

export default App;
