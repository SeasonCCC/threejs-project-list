const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const baseSetting = require('./base.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/ts/main.ts',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
    // chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['thread-loader', 'css-loader', 'sass-loader']
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }, {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            // options: {
            //   publicPath: baseSetting.publicPath + '/assets/',
            //   outputPath: './assets'
            // }
          }
        ]
      }
    ]
  },
  // plugins: [new HtmlWebpackPlugin({
  //     basePath: resolve('dist'),
  //     filename: 'index.html',
  //     template: 'src/html/index.html',
  //     inject: false
  //   })],
  // externals: baseSetting.externals,
  resolve: {
    extensions: [
      '.js', '.vue', '.json'
    ],
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    contentBase: './',
    // publicPath: '/dist/',
    compress: true,
    port: 1717
  }
}
