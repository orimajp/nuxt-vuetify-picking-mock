const pkg = require('./package')
const path = require('path');

// https://ja.nuxtjs.org/faq/github-pages/
/* nuxt.config.js */
// `DEPLOY_ENV` が `GH_PAGES` の場合のみ `router.base = '/<repository-name>/'` を追加する
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/nuxt-vuetify-picking-mock/'
  }
} : {}

/*export default {
  ...routerBase

}*/

module.exports = {
  mode: 'spa',
  srcDir: 'app',
  generate: {dir: 'docs'},
  ...routerBase,

  /*
  ** for IntelliJ IDEA / WebStorm
  */
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
//    root: path.resolve(__dirname, 'app/'),
    alias: {
      '@': path.resolve(__dirname, 'app/'),
      '~': path.resolve(__dirname, 'app/'),
    },
  },

  /*
  ** Headers of the page
  */
  head: {
//    title: pkg.name,
    titleTemplate: '%s | Picking Sample',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
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
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '~/plugins/filters',
  ],

  router: {
    middleware: 'dataInitializer',
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
