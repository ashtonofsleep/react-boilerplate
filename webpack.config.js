const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/main.js',
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public')
		},
		historyApiFallback: true,
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
							modules: {
								localIdentName: 'w10-[hash:base64:6]'
							}
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: false,
							debug: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack']
			}
		]
	},
	resolve: {
		alias: {
			'/src': path.resolve(__dirname, 'src'),
			'/assets': path.resolve(__dirname, 'src/assets'),
			'/scss': path.resolve(__dirname, 'src/assets/scss'),
			'/fonts': path.resolve(__dirname, 'src/assets/fonts'),
			'/images': path.resolve(__dirname, 'src/assets/images'),
			'/components': path.resolve(__dirname, 'src/components'),
			'/pages': path.resolve(__dirname, 'src/pages'),
			'/utils': path.resolve(__dirname, 'src/utils'),
			'/helpers': path.resolve(__dirname, 'src/helpers')
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			inject: 'head',
			scriptLoading: 'defer'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css'
		})
	]
};
