import React from 'react';
import Footer from './Footer';

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
