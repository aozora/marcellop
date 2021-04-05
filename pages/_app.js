import React from 'react';
import Layout from '@/components/layout';

// app styles
import '@/styles/fonts.css';
import '@/styles/app.scss';

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout
      site={pageProps.site}
      page={pageProps.page}
      menu={pageProps.menu}
      preview={pageProps.preview}
    >
      {/* <AnimatePresence exitBeforeEnter> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} key={router.route} />
      {/* </AnimatePresence> */}
    </Layout>
  );
}

export default MyApp;
