const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: './src/server/index.tsx',
  output: {
    filename: 'server_bundle.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: 'ts-loader' }, { loader: 'eslint-loader' }],
      },
    ],
  },
  externals: [webpackNodeExternals()],
};
