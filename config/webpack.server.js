

var path = require('path');
var fs = require('fs');
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

//const BabiliPlugin = require("babili-webpack-plugin");
const paths = require('./paths.server');


module.exports = {
  mode:"production",
  entry: path.resolve(paths.serverSrc, 'index.js'),
  devtool: '#source-map',
  target: 'node',
  output: {
    path: paths.serverBuild,
    filename: 'index.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  module: {
    rules: [
      // Process JS with Babel.
      {
        test: /\.js?$/,
        //use: "babel-loader", //如果提供了options，需要使用loader
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        include: paths.serverSrc,
        options: {
          babelrc: false,
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: [
            'babel-plugin-syntax-object-rest-spread',
            'babel-plugin-transform-object-rest-spread'
          ]
        },
      },
    ]
  },
  plugins: [
    
            new webpack.NamedModulesPlugin(),
    
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"', 
                "process.env": { BUILD_TARGET: JSON.stringify("server") },
                'process.env.PORT': JSON.stringify(process.env.PORT || 3000)
            }),
        ],  
  performance: { hints: false },
  externals: [
      nodeExternals()
  ],
};