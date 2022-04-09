import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import paths from "./paths";

module.exports = {
	mode: "production",
	output: {
		filename: `${paths.jsFolder}/[name].[hash].js`,
		path: paths.outputPath,
		chunkFilename: "[name].[chunkhash].js",
		publicPath: "/",
	},
	plugins: [
		new CleanWebpackPlugin(
			{
				output: { path: paths.outputPath },
			},
			{
				root: paths.root,
			},
		),
		new CopyPlugin({
			patterns: [{ from: "public", to: "" }],
		}),
	],
};
