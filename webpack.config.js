const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    // !DEFAULT PORT IS 8080
    // port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hot: true,
    // proxy: {
    //   // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    //   // return true for the context which means for all endpoints, proxy to the target
    //   // the index also had to be set
    //   context: () => true,
    //   // !Original port was 80
    //   target: 'http://localhost:3000',
    // },
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        changeOrigin: true,
      }
    },
    disableHostCheck: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

// https://github.com/webpack/webpack-dev-server/issues/1604
