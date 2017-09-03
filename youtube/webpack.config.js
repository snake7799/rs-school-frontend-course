module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js'
    },
    module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			}
		]
    }
};
