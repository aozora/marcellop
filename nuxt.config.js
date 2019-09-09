import gql from 'graphql-tag';
import apolloClient from './apollo/apollo-client';
// const glob = require('glob');
// const path = require('path');
// const pkg = require('./package');

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  console.log('token: ' + require('./.datocms.js').NUXT_ENV_DATO_CMS_TOKEN);
}

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
      const dynamicRoutes = data.data.allPosts.map(post => `/writings/${post.slug}`);
      // console.log(data);
      console.log(dynamicRoutes);

      return [
        ...staticRoutes,
        ...dynamicRoutes
      ];
    });
}

export default {
  mode: 'universal',
  modern: true,

  env: {
    cmsToken: process.env.NUXT_ENV_DATO_CMS_TOKEN || require('./.datocms.js').NUXT_ENV_DATO_CMS_TOKEN,
    cmsSearchToken: process.env.NUXT_ENV_DATO_CMS_SEARCH_TOKEN || require('./.datocms.js').NUXT_ENV_DATO_CMS_SEARCH_TOKEN
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
    // '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/apollo',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap'
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

  apollo: {
    errorHandler: '~/apollo/apollo-error-handler.js',
    clientConfigs: {
      default: '~/apollo/apollo-config.js',
    }
  },

  feed: [
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
        const query = gql`
            {
                allPosts(filter: {_status: {eq: published}}) {
                    id
                    slug
                    title
                    category
                    body(markdown: false)
                }
            }
        `;

        const data = await apolloClient.query({ query: query });
        const publishedPosts = data.data.allPosts;
        // `/writings/${post.slug}`
        publishedPosts.forEach(post => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `https://www.marcellop.com/writings/${post.slug}`,
            description: post.body,
            content: post.body
          });

          if (post.category) {
            feed.addCategory(post.category);
          }
        });

      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      // data: ['Some additional data'] // Will be passed as 2nd argument to `create` function
    }
  ],

  sitemap: {
    hostname: 'https:www.marcellop.com',
    gzip: true,
    exclude: [],
    routes: routes
    // routes: [
    //   '/page/1',
    //   {
    //     url: '/page/2',
    //     changefreq: 'daily',
    //     priority: 1,
    //     lastmodISO: '2017-06-30T13:30:00.000Z'
    //   }
    // ]
  }
};
