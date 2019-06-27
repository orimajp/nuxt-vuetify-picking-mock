const pkg = require('./package')
const path = require('path');

generateDir = {
  generate: {dir: 'docs'}
}

module.exports = {
  mode: 'spa',
  srcDir: 'app',
  ...generateDir,

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
