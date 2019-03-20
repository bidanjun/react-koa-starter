const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const StartServerPlugin = require("start-server-webpack-plugin");

const paths = require('./paths.server');

module.exports = {
    mode:"development",
    devtool: '#source-map',
    entry: {
        server: [
            "webpack/hot/poll?1000",
            "./server/index"
        ]
    },
    watch: true,
    target: "node",
    cache: true,
    externals: [
        nodeExternals({ whitelist: [ "webpack/hot/poll?1000" ] })
    ],
    module: {
        rules: [
          // Process JS with Babel.
          {
            test: /\.(js|jsx)$/,
            include: paths.serverSrc,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              "presets": ["babel-preset-react-app"],
              // plugins: [
              //   "@babel/plugin-proposal-object-rest-spread",
              //   // 'babel-plugin-syntax-object-rest-spread',
              //   // 'babel-plugin-transform-object-rest-spread'
              // ]
            },
          },
        ]
      },
    plugins: [
        new StartServerPlugin("index.js"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { BUILD_TARGET: JSON.stringify("server") },
            "process.env.PORT": JSON.stringify(process.env.PORT || 3000),
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
    ],
    output: {
        path: path.join(__dirname, "../build"),
        filename: "index.js",
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    },
};