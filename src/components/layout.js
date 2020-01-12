/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Header from './Header';
import Footer from './Footer';

import '../styles/app.scss';

const TemplateWrapper = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    {
      datoCmsSite {
        globalSeo {
          siteName
          titleSuffix
          twitterAccount
          fallbackSeo {
            title
            image {
              url
              format
            }
            description
            twitterCard
          }
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
      }
    }
  `);

  return (
    <>
      <HelmetDatoCms
        favicon={data.datoCmsSite.faviconMetaTags}
        seo={data.datoCmsHome.seoMetaTags}
      >
        <body className={path === '/' ? 'home' : ''}/>
      </HelmetDatoCms>
      <a href="#main" tabIndex="0">Skip to main content</a>
      <Header/>
      <main id="main" role="main">
        {children}
      </main>
      <Footer/>
    </>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  path: PropTypes.string
};

export default TemplateWrapper;
