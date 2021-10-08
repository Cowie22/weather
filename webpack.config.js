
const webpack = require('webpack');
var path = require('path');
var DIST_DIR = path.join(__dirname, '/client/public');
var SRC_DIR = path.join(__dirname, '/client/src');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
				test: /\.(scss)$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}, {
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [ 
                require('autoprefixer')
              ]
						}
					}
				}]
			}
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    // hot: true,
  },
};