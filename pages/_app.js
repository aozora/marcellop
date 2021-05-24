import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout';
// app styles
import '@/styles/fonts.css';
import '@/styles/app.scss';
import Meta from '@/components/meta';
import Alert from '@/components/alert';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }) {
  const { site, page, menu, preview } = pageProps;
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const handleRouteChange = () => {
      // eslint-disable-next-line no-unused-expressions
      isFirstMount && setIsFirstMount(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isFirstMount, router.events]);

  return (
    <Layout menu={menu}>
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

      <AnimatePresence exitBeforeEnter>
        <Component
          {...pageProps}
          isFirstMount={isFirstMount}
          key={router.route}
        />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
