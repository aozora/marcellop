import apolloClient from './apollo/apollo-client';
import gql from 'graphql-tag';
const glob = require('glob');
const path = require('path');
const pkg = require('./package');
require('dotenv').config();

const query = gql`
    {
        allPosts {
            slug
        }
    }
`;


/**
 * Routes used by Nuxt generate and Sitemap
 * @type {string[]}
 */
const staticRoutes = [
  '/',
  '/resume'
];

function routes() {
  return apolloClient.query({ query: query })
    .then((data) => {
      const dynamicRoutes = data.allPosts.map(post => `/writings/${post.slug}`);
      console.log(dynamicRoutes);
      return [
        ...staticRoutes,
        ...dynamicRoutes
      ];
    });
}

console.log(`NUXT_ENV_DATO_CMS_TOKEN=${process.env.NUXT_ENV_DATO_CMS_TOKEN}`);

export default {
  mode: 'universal',
  modern: true,

  env: {
    DEBUG: 'nuxt:*'
  },

  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/app.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    // { src: '~/plugins/vue-lazy-load', ssr: false }
    { src: '~/plugins/gsap', ssr: false },
    { src: '~/plugins/vue-observe-visibility.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/apollo'
  ],

  /*
  ** Route config for pre-rendering
  */
  generate: {
    // routes: dynamicRoutes
    routes: routes
  },

  terser: {
    sourceMap: true
  },

  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
    }
  },

  dotenv:{

  },

  apollo: {
    errorHandler: '~/apollo/apollo-error-handler.js',
    clientConfigs: {
      default: '~/apollo/apollo-config.js',
    }
  },
};
