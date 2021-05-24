import React from 'react';
import Header from '@/components/Header';
import Footer from './Footer';

export default function Layout({ menu, children }) {
  return (
    <>
      <Header menu={menu} />
      <main id="main" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
