module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'This is the web presence of MarcelloP',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:300,400' },
      { rel: 'dns-prefetch', href: 'fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com/', crossorigin: '' }
]
  },
  /*
   ** Global CSS
   */
  css: [
    // '~assets/css/main.css'
    { src: '~assets/scss/app.scss', lang: 'scss' } // scss instead of sass
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
