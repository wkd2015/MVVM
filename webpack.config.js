var path = require('path')
var webpack = require('webpack')
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin')

var port = process.env.NODE_ENV || 9101;

var uri = "http://localhost:" + port;

module.exports = {
  entry: {
    entry: './src/mvvm/mvvm.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new OpenBrowserWebpackPlugin({
      url: uri
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.css'],
    alias: {
      'compile': path.resolve(__dirname, 'src/mvvm/compile'),
      'watch': path.resolve(__dirname, 'src/mvvm/watch'),
      'observer': path.resolve(__dirname, 'src/mvvm/observer')
    }
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    // hot: true,
    port: port
  }
}