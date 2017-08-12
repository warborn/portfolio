import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({ template: './src/index.html' });

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const config = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'style-loader!css-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules']
  },
  plugins: [htmlWebpackPluginConfig]
}

export default config;