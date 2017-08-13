import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const htmlWebpackPluginConfig = new HtmlWebpackPlugin({ template: './src/index.html' });

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
  styles: path.join(__dirname, 'src', 'scss', 'index.scss')
};

const config = {
  entry: [
    PATHS.app,
    PATHS.styles
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.scss/,
        loader: 'import-glob-loader'
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, 
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?importLoaders=1'
        })
      },
      { test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules']
  },
  plugins: [
    htmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'dist/index_bundle.css',
      allChunks: true
    })
  ]
}

export default config;