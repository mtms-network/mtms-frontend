const webpack = require("webpack");
const dotenv = require("dotenv");

const paths = require("./paths");

const env = dotenv.config().parsed;
const envKeys = Object.keys(env || {}).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  // output: {
  //   filename: "[name].js",
  //   path: paths.outputPath,
  //   chunkFilename: "[name].js",
  //   publicPath: "/",
  // },
  // performance: {
  //   hints: "warning",
  //   maxAssetSize: 20000000,
  //   maxEntrypointSize: 85000000,
  //   assetFilter: (assetFilename) => {
  //     return assetFilename.endsWith(".css") || assetFilename.endsWith(".js");
  //   },
  // },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //   },
  // },
  devServer: {
    port: 8080,
    compress: true,
    historyApiFallback: true,
    hot: true,
    proxy: {
      "/api": {
        target: env.REACT_APP_API_URL,
        pathRewrite: {
          "^/api": "/", // rewrite path
        },
        secure: true,
        changeOrigin: true,
        logLevel: "debug",
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin(envKeys)],
};
