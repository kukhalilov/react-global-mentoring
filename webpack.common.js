import { resolve as _resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const entry = {
  app: './src/index.tsx',
};
export const module = {
  rules: [
    {
      test: /\.(js|ts)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    },
  ],
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.jsx', '.js'],
};
export const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
  }),
];
export const output = {
  filename: '[name].bundle.js',
  path: _resolve(__dirname, 'dist'),
  clean: true,
};
