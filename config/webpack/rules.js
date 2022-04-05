module.exports = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
    ],
  },
  {
    test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
    use: ['url-loader?limit=10000', 'img-loader'],
  },
  {
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
    ],
  },
];
