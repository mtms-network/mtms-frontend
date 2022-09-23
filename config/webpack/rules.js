module.exports = [
	{
		test: /\.js$/,
		exclude: /node_modules/,
		use: {
			loader: "babel-loader",
		},
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /node_modules/,
		loader: "file-loader",
	},
	{
		test: /\.(jpe?g|png|gif|svg|webp|ico)$/i,
		use: ["url-loader?limit=10000", "img-loader"],
	},
	{
		test: /\.css$/,
		use: [
			{
				loader: "style-loader",
			},
			{
				loader: "css-loader",
			},
			"postcss-loader",
		],
	},
  {
    test: /\.scss$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
      },
      {
        loader: "sass-loader"
      },
      "postcss-loader",
    ],
  },
];
