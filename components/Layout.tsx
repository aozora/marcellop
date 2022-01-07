import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from './Footer';
import { Alert } from '@/components/Alert';

type LayoutProps = {
  preview?: boolean;
  pageProps?: any;
  children?: React.ReactNode;
};

export const Layout = ({ preview = false, pageProps, children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Head>

      <a href="#main" tabIndex={0}>
        Skip to main content
      </a>

      <Header />
      <Alert preview={preview} />

      <main id="main" role="main">
        {children}
      </main>

      <Footer />
    </>
  );
};
