const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseSetting = require('./base.js')


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/main',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: baseSetting.publicPath,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: [{
            loader: 'thread-loader'
          },
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                'scss': [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
              },
              transformAssetUrls: {
                audio: 'src'
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['thread-loader', 'vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: baseSetting.publicPath + '/assets/',
            outputPath: './assets'
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      basePath: baseSetting.publicPath,
      filename: resolve('/dist') + '/index.html',
      template: 'src/html/index.html',
      inject: false
    }),
  ],
  externals: baseSetting.externals,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 'vue': 'vue/dist/vue.js',
      '@': resolve('src')
    }
  },
  devtool: false
}
