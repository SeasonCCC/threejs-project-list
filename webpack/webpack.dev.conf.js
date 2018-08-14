const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseSetting = require('./base.js')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

let entryObj = {}
baseSetting.dirname.forEach(function(dirname, i) {
  entryObj['../dist/' + dirname + '/index'] = './src/' + dirname + '/ts/main.ts'
})

let htmlPlugins = baseSetting.dirname.map(function(dirname) {
  return new HtmlWebpackPlugin({
    filename: '' + dirname + '/index.html',
    template: resolve('src/' + dirname + '/html/index.html'),
    inject: false
  })
})

module.exports = {
  entry: entryObj,
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    // publicPath: '/dist/'
    // chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              sass: true
            }
          }
        ]
      }, {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      }, {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/,
              name: '[1]-[name].[ext]'
              // name(file) {
              //   // console.log(file)
              //   // let fileDir = file.dirname.toString()
              //   // let dir = fileDir.match(/src\/(\S*)\/assets/)[1]
              //   return dir + '[hash].[ext]'
              // }
              // publicPath: baseSetting.publicPath + '/assets/',
              // outputPath: '../'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin([/css.d.ts$/])
  ].concat(htmlPlugins),
  // externals: baseSetting.externals,
  resolve: {
    extensions: [
      '.js', '.vue', '.json', '.ts'
    ],
    alias: {
      '@': resolve('src')
    }
  },
  devServer: {
    host: '0.0.0.0',
    // hot: true,
    open: true,
    contentBase: './',
    publicPath: '/dist/',
    compress: true,
    port: 1717
  }
}
