/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql, Link } from "gatsby";
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
              aboutDescription1(locale: en, markdown: true)
              aboutDescription2(locale: en, markdown: true)
              aboutDescription3(locale: en, markdown: true)
              aboutDescription4(locale: en, markdown: true)
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
            <p className="sidebar__social">
              {/*{data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (*/}
              {/*  <a*/}
              {/*    key={profile.profileType}*/}
              {/*    href={profile.url}*/}
              {/*    target="blank"*/}
              {/*    className={`social social--${profile.profileType.toLowerCase()}`}*/}
              {/*  > </a>*/}
              {/*))}*/}
            </p>

          </div>
        </div>

        <div className="container__body">
          <div className="container__mobile-header">
            <div className="mobile-header">
              <div className="mobile-header__menu">
                <Link to="#" data-js="toggleSidebar"/>
              </div>
              <div className="mobile-header__logo">
                <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
              </div>
            </div>
          </div>
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
