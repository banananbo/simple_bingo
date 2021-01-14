const path = require('path');

const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  mode: env,
  module: {
    rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
        }
      ]
  },
}