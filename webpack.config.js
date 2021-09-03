/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
// const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const deps = require('./package.json').dependencies;

module.exports = {
  entry: './src/index',
  cache: true,

  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
    runtimeChunk: 'single'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {}
  },

  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/i,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      filename: 'remoteEntry.js',
      remotes: { remote: 'remote@http://localhost:3001/remoteEntry.js' },
      shared: {
        ...deps,
        react: {
          singleton: true,
          eager: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom']
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ],

  devServer: {
    port: 3000
  }
};
