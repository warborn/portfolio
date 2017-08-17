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
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    alias: {
      "TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  htmlWebpackPluginConfig,
  new ExtractTextPlugin({
    filename: 'index_bundle.css',
    allChunks: true
  })
]

if (isProduction === true) {
  console.log('****PRODUCTION BUILD****');
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true })
  );
}

const developmentConfig = {
  devServer: {
    historyApiFallback: true
  },
  plugins: plugins
}

const productionConfig = {
  plugins: plugins
}

export default Object.assign({}, config, 
  isProduction === true ? productionConfig : developmentConfig
);