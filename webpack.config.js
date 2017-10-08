const webpack = require('webpack');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const yargs = require('yargs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PRODUCTION = !!(yargs.argv.production);


function resolve(dir) {
  return path.join(__dirname, dir);
}


const plugins = [
  // Set environment variable
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: PRODUCTION ? 'production' : 'development'
    }
  }),

  // split vendor js into its own file
  // any required modules inside node_modules are extracted to vendor
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: (module) => {
      return module.context && module.context.indexOf('node_modules') !== -1;
    }
  }),

  // extract webpack runtime and module manifest to its own file in order to
  // prevent vendor hash from being updated whenever app bundle is updated
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    chunks: Infinity
  }),

  // Friendly errors
  new FriendlyErrorsPlugin(),

  // // Bundle Analyzer
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static'
  // })
];

// if bundling for production, add the Uglify plugin to minimize the js
if (PRODUCTION) {
  plugins.push(new webpack.optimize.UglifyJsPlugin(
    {
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
  );

  // plugins.push(
  //   // service worker caching
  //   new SWPrecacheWebpackPlugin({
  //     cacheId: 'wud2017',
  //     filename: 'service-worker.js',
  //     staticFileGlobs: ['static/**/*.{js,html,css}'],
  //     minify: true,
  //     stripPrefix: 'static/'
  //   }));
}


module.exports = {
  // NOTE: 'entry' is set by gulp
  // -----------------------------------------------
  entry: [
    './src/assets/js/main.js'
  ],
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: path.resolve(__dirname, './'), // path.resolve(__dirname, 'static/js'),
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/', // http://localhost:8080',
    // filename: '[name].[chunkhash].js',
    // chunkFilename: '[id].[chunkhash].js'

    // filename: PRODUCTION ? '[name].min.js' : '[name].js',
    // chunkFilename: PRODUCTION ? '[id].min.js' : '[id].js'
    filename: '[name].js',
    chunkFilename: '[id].js'
  },

  resolve: {
    extensions: ['.js'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  // externals: { jquery: 'jQuery' },
  devtool: 'source-map',
  plugins: plugins
};
