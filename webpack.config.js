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
      vue: 'vue/dist/vue.esm.js',
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
}