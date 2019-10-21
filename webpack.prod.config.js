const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const prodWebpackConfig = merge(webpackConfig, {
	mode: 'production',
	plugins: []
});

module.exports = new Promise((resolve, reject) => {
	resolve(prodWebpackConfig)
});
