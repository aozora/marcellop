module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'This is the web presence of Marcello Palmitessa',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'This is the web presence of Marcello Palmitessa'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,600,700|Poppins:300,400'},
      {rel: 'dns-prefetch', href: 'fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.googleapis.com/', crossorigin: ''}
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    // '~assets/css/main.css'
    {src: '~assets/scss/app.scss', lang: 'scss'} // scss instead of sass
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#3B8070'},

  plugins: [
    '~plugins/vue-smoothscroll'
  ],

  /*
   ** Build configuration
   */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
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
