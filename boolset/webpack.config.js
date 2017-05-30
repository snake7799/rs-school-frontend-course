module.exports = {
	entry: {
		app: './app.js'
	},
    output: {
        filename: '[name].bundle.js',
		path: __dirname + '/dist',
		publicPath: 'dist/'
    },
    module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}]
    }
};
