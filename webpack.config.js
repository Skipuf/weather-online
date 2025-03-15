const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
	entry: './src/index.tsx', // Изменение .js на .tsx
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/, // Добавлен обработчик TypeScript
				exclude: /node_modules/,
				use: 'ts-loader', // Используем ts-loader вместо babel-loader
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new ForkTsCheckerWebpackPlugin({
			// Новый плагин для проверки типов
			async: false,
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'], // Добавлены .tsx и .ts
	},
	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		hot: true,
	},
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
}
