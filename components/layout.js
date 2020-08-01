import Header from '@/components/Header';
import React from 'react';
import Alert from './alert';
import Footer from './Footer';
import Meta from './meta';

export default function Layout({ preview, children, site, page, menu }) {
  return (
    <>
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
      <Alert preview={preview} />
      <Header menu={menu} />
      <main id="main" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
