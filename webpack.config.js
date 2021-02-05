const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.ts',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: env,
  module: {
    rules: 
    [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader',
                'css-loader'
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
              {
              loader: 'ts-loader',
              options: {
                  // transpileOnly: true,
                  appendTsSuffixTo: [/\.vue$/] /* .vueファイルをTSとして読み込むようにする */
              }
              } 
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2|svg)$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: "[name].[ext]",
                  outputPath: './webfonts',
                  publicPath: '../webfonts',
              }
          }]
      },
      ]
  },
  resolve: {
    alias: {
      '@src': path.join(__dirname, 'src'),
      '@lib': path.join(__dirname, 'src/lib'),
      '@pages': path.join(__dirname, 'src/pages'),
      '@organisms': path.join(__dirname, 'src/organisms'),
      '@atoms': path.join(__dirname, 'src/atoms'),
      '@mixin': path.join(__dirname, 'src/mixin'),
      vue: 'vue/dist/vue.esm.js',
    },
    extensions: [
      '.ts','js'
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}