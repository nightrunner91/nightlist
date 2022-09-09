const webpack = require('webpack')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/nightlist/'
    : '/',
  lintOnSave: false,
  devServer: {
    port: 9191,
  },
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      }),
      // new CompressionPlugin({
      //   test: /\.js(\?.*)?$/i
      // })
    ],
    // optimization: {
    //   nodeEnv: 'production',
    //   minimize: true
    // }
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  css: {
    extract: false
  },
  filenameHashing: false,
}