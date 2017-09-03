module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: __dirname + '/dist',
        publicPath: 'dist/'
    },
    module: {
        loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			}
		]
    }
};
