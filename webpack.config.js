const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
	entry: './src/main.js', // точка входа вашего приложения
	output: {
		filename: 'bundle.js', // имя выходного файла
		path: path.resolve(__dirname, 'dist'), // путь к директории, где будет сохранен собранный файл
	},
	module: {
		rules: [
			{
				test: /\.vue$/, // регулярное выражение для сопоставления файлов Vue
				loader: 'vue-loader', // загрузчик для обработки файлов Vue
			},
			{
				test: /\.js$/, // регулярное выражение для сопоставления файлов JavaScript
				loader: 'babel-loader', // загрузчик для транспиляции JavaScript через Babel
				exclude: /node_modules/, // исключить папку node_modules
			},
		],
	},
	plugins: [
		new VueLoaderPlugin(), // плагин VueLoaderPlugin для использования Vue с webpack
		new webpack.DefinePlugin({
			__VUE_OPTIONS_API__: 'true',
			__VUE_PROD_DEVTOOLS__: 'false',
			__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
		}),
	],
};
