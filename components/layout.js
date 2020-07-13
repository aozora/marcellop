import Header from '@/components/Header';
import React from 'react';
import Alert from './alert';
import Footer from './footer';
import Meta from './meta';

export default function Layout({
  preview,
  children,
  site,
  page,
  menu
}) {
  return (
    <>
      <Meta meta={page.seo.concat(site.favicon)} />
      <a href="#main" tabIndex="0">Skip to main content</a>
      <Alert preview={preview} />
      <Header menu={menu} />
      <main id="main" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
