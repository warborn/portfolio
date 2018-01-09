import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

const srcPath = path.join(__dirname, 'src');
const PATHS = {
  app: srcPath,
  indexPage: path.join(srcPath, 'js', 'index.js'),
  indexPageStyles:path.join(srcPath, 'scss', 'index.scss'),
  projectsPage: path.join(srcPath, 'js', 'projects.js'),
  projectsPageStyles: path.join(srcPath, 'scss', 'projects.scss'),
  build: path.join(__dirname, 'dist'),
};

const config = {
  entry: {
    index: [PATHS.indexPage, PATHS.indexPageStyles],
    projects: [PATHS.projectsPage, PATHS.projectsPageStyles],
  },
  output: {
    path: PATHS.build,
    filename: '[name]_bundle.js',
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
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
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
      "debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
      "imagesLoaded": path.resolve('node_modules', 'imagesloaded/imagesloaded.pkgd.js'),
      "Hammer": path.resolve('node_modules', 'hammerjs/hammer.js'),
    }
  }
}

const isProduction = process.env.NODE_ENV === 'production';

const plugins = [
  new HtmlWebpackPlugin({
    inject: true,
    chunks: ['index'],
    filename: 'index.html',
    template: './src/index.html'
  }),
  new HtmlWebpackPlugin({
    inject: true,
    chunks: ['projects'],
    filename: 'projects.html',
    template: './src/projects.pug'
  }),
  new ExtractTextPlugin({
    filename: '[name]_bundle.css'
  })
];

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