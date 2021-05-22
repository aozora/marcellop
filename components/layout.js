import Header from '@/components/Header';
import React from 'react';
import Alert from './alert';
import Footer from './Footer';
import Meta from './meta';

export default function Layout({ children }) {
  return (
    <>
      <main id="main" role="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
