const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sharpAdapter = require('responsive-loader/sharp');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    configObj.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return configObj;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.js',
  output: {
    filename: `./${filename('js')}`,
    publicPath: '',
    assetModuleFilename: "images/[name][hash][ext][query]",
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: isProd ? false : 'source-map',
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `./${filename('css')}`
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev
            },
          },
          'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(?:|gif|svg)$/,
        type: "asset",
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: {
            loader: 'responsive-loader',
            options: {
                adapter: sharpAdapter,
            }
        }
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: 'file-loader',
            options: {
                name: `./images/${filename('[ext]')}`
            }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(?:|eot|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `./fonts/${filename('[ext]')}`
          }
        }],
      }
    ]
  }
}