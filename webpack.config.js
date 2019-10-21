const path = require('path');
const webpack = require('webpack');
const imageMinPlugin = require('imagemin-webpack');
const htmlWebPackPlugin = require('html-webpack-plugin');
const copyWebPackPlugin = require('copy-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist')
};

const configuration = {
	externals: {
		paths: PATHS
	},
	entry: {
		index: PATHS.src
	},
	output: {
		path: PATHS.dist,
		filename: './index.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						exclude: '/node_modules/'
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: './fonts'
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					miniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {sourceMap: true}
					},
					{
						loader: 'postcss-loader',
						options: {sourceMap: true, config: {path: './postcss.config.js'}}
					},
					{
						loader: 'sass-loader',
						options: {sourceMap: true}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new miniCssExtractPlugin({
			filename: './index.css'
		}),
		new htmlWebPackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: './index.html'
		}),
		new copyWebPackPlugin([
			{from: `${PATHS.src}/img`, to: `${PATHS.dist}/img`},
			{from: `${PATHS.src}/static`, to: `${PATHS.dist}/static`}
		]),
		new imageMinPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			name: "[path][name].[ext]",
			imageminOptions: {
				plugins: [
					["imagemin-mozjpeg", { quality: 50 } ],
					["imagemin-pngquant", { quality: [0.3, 0.5] } ]
				]
			}
		})
	]
};

module.exports = configuration;