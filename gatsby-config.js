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
    {
      resolve: 'gatsby-source-datocms',
      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area:
        // eslint-disable-next-line global-require
        apiToken: process.env.NUXT_ENV_DATO_CMS_TOKEN || require('./.datocms.js').NUXT_ENV_DATO_CMS_TOKEN,

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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ]
};
