/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { HelmetDatoCms } from 'gatsby-source-datocms';

// import Header from "./header";
import '../styles/app.scss';

const TemplateWrapper = ({ children }) => {
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
              hi
              heading1
              heading2A
              heading2B
              heading2C
              aboutHeading
              aboutDescription1
              aboutDescription2
              aboutPicture {
                  alt
                  url
                  fluid(maxWidth: 630, sizes: "(min-width: 17em) 50vw, 100vw", imgixParams: {fm: "jpg", auto: "compress"}) {
                      ...GatsbyDatoCmsSizes
                  }
              }
              aboutDescription3
              aboutDescription4
              whatidoHeading
              whatido {
                  title
                  description
              }
              seoMetaTags {
                  ...GatsbyDatoCmsSeoMetaTags
              }
          }
      }
  `);

  return (
    <>
      <div className="container">
        <HelmetDatoCms
          favicon={data.datoCmsSite.faviconMetaTags}
          seo={data.datoCmsHome.seoMetaTags}
        />
        <div className="container__sidebar">
          <div className="sidebar">
            <h6 className="sidebar__title">
              <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
            </h6>


            <ul className="sidebar__menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>

          </div>
        </div>

        <div className="container__body">
          {children}
        </div>
      </div>
    </>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default TemplateWrapper;


//
// const Layout = ({ children }) => {
//   const data = useStaticQuery(graphql`
//       query SiteTitleQuery {
//           site {
//               siteMetadata {
//                   title
//               }
//           }
//       }
//   `)
//
//   return (
//     <>
//       <Header siteTitle={data.site.siteMetadata.title}/>
//       <div
//         style={{
//           margin: `0 auto`,
//           maxWidth: 960,
//           padding: `0px 1.0875rem 1.45rem`,
//           paddingTop: 0,
//         }}
//       >
//         <main>{children}</main>
//         <footer>
//           © {new Date().getFullYear()}, Built with
//           {` `}
//           <a href="https://www.gatsbyjs.org">Gatsby</a>
//         </footer>
//       </div>
//     </>
//   )
// }
//
// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }
//
// export default Layout
