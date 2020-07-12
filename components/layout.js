import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Header from '@/components/header';
import React from 'react';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta/>
      <a href="#main" tabIndex="0">Skip to main content</a>
      <Alert preview={preview}/>
      <Header/>
      <main id="main" role="main">
        {children}
      </main>
      <Footer/>
    </>
  )
}
