// vue.config.js
const path = require('path')
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js') 
        .end() 
    }  
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/base/_variables.scss'),
        path.resolve(__dirname, './src/assets/scss/utilities/_functions.scss'),
      ]
    }
  }
}
