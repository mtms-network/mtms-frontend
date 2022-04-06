import webpack from 'webpack';
import dotenv from 'dotenv';

import paths from './paths';

const env = dotenv.config().parsed;
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 20000000,
    maxEntrypointSize: 8500000,
    assetFilter: assetFilename => {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 8080,
    compress: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: process.env.API_URL,
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(envKeys),
  ],
};
