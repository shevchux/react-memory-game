const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.tsx',
  context: path.resolve(__dirname, 'src'),

  output: {
    filename: 'scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },

  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
      filename: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/style.css',
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
  },
};
