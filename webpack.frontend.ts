import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { join } from 'node:path';
import 'webpack-dev-server';

const { EsbuildPlugin } = require('esbuild-loader');

const dev = 'development';
const prod = 'production';
const modeEnv = process.env.MODE;
const isDev = dev === modeEnv;
const isProd = prod === modeEnv;
const mode = isDev || isProd ? modeEnv : dev;

const config: Configuration = {
  mode: mode,
  devtool: isDev ? 'eval-source-map' : 'source-map',
  entry: './frontend/index.tsx',
  output: {
    path: join(__dirname, '.builds', 'frontend'),
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: 'esbuild-loader',
        options: {
          tsconfig: join(__dirname, 'frontend', 'tsconfig.json'),
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'frontend', 'index.html'),
    }),
  ],
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'chrome80',
      }),
    ],
  },
  devServer: {
    compress: true,
    port: 4000,
    watchFiles: join(__dirname, 'frontend', '**', '*'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
};

export default config;
