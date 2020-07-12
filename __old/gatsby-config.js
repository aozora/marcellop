module.exports = {
  siteMetadata: {
    title: 'Marcello Palmitessa',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@aozora'
  },
  plugins: [
    'gatsby-plugin-transition-link',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'images',
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        // eslint-disable-next-line global-require
        apiToken: process.env.NUXT_ENV_DATO_CMS_TOKEN || require('.datocms.js').NUXT_ENV_DATO_CMS_TOKEN,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Custom API base URL
        apiUrl: 'https://site-api.datocms.com'

        // Setup locale fallbacks
        // In this example, if some field value is missing in Italian, fall back to English
        // localeFallbacks: {
        //   it: ['en'],
        // },
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#5F4B8B',
        theme_color: '#5F4B8B',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png' // This path is relative to the root of the site.
      }
    }

    // {
    //   resolve: 'gatsby-plugin-feed',
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             author
    //             description
    //             title
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map((edge) => {
    //           // eslint-disable-next-line prefer-object-spread
    //           return Object.assign({}, {
    //             description: edge.node.bodyNode.childMarkdownRemark.excerpt,
    //             date: edge.node.meta.publishedAt,
    //             url: site.siteMetadata.siteUrl + edge.node.slug,
    //             guid: site.siteMetadata.siteUrl + edge.node.slug,
    //             custom_elements: [{ 'content:encoded': edge.node.bodyNode.childMarkdownRemark.html }]
    //           });
    //         }),
    //         query: `
    //           {
    //             allDatoCmsPost(sort: {order: DESC, fields: meta___publishedAt}) {
    //               edges {
    //                 node {
    //                   title
    //                   slug
    //                   bodyNode {
    //                     childMarkdownRemark {
    //                       excerpt
    //                       html
    //                     }
    //                   }
    //                   meta {
    //                     publishedAt
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: '/rss.xml',
    //         title: 'Marcello Palmitessa\'s RSS Feed',
    //         // optional configuration to insert feed reference in pages:
    //         // if `string` is used, it will be used to create RegExp and then test if pathname of
    //         // current page satisfied this regular expression;
    //         // if not provided or `undefined`, all pages will have feed reference inserted
    //         match: '^/writings/',
    //         // optional configuration to specify external rss feed, such as feedburner
    //         // link: "https://feeds.feedburner.com/gatsby/blog",
    //       },
    //     ]
    //   }
    // }

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
