import React from 'react';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Layout from '../components/layout';
import SEO from '../components/Seo';

const NotFoundPage = () => (
  <Layout>
    <HelmetDatoCms>
      <body className="error-page"/>
    </HelmetDatoCms>
    <SEO title="404: Not found"/>
    <h1>Cat not found</h1>
    <section className="hero">
      <p>
        <span>The page </span>
        <span>you&#39;re looking for </span>
        <span>doesn&#39;t exists...</span>
      </p>
    </section>
  </Layout>
);

export default NotFoundPage;
