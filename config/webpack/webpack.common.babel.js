import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import paths from './paths';
import rules from './rules';

module.exports = {
  entry: paths.entryPath,
  module: {
    rules,
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.css', '.scss'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      favicon: 'src/favicon.ico',
      template: paths.templatePath,
      minify: {
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        minifyURLs: true,
        removeComments: true,
        removeAttributeQuotes: true,
      },
    }),
  ],
};
