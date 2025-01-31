/*
 * Copyright (C) 2019 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

const path = require('path')
const webpack = require('webpack')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      {test: /(\.css$)/, include: /node_modules/, loaders: ['style-loader', 'css-loader']},
      {test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000'}
    ],
    noParse: [
      /i18nliner\/dist\/lib\/i18nliner/ // i18nLiner has a `require('fs')` that it doesn't actually need, ignore it.
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.DEBUG': JSON.stringify(process.env.DEBUG),
      ENV: JSON.stringify(process.env.NODE_ENV)
    })
  ],
  mode: 'development',
  entry: {
    testcafe: [path.join(__dirname, 'testcafe', 'entry.js')]
  },
  output: {
    path: path.join(__dirname, 'testcafe/build'),
    filename: '[name].js',
    publicPath: path.join(__dirname, 'testcafe/build/')
  }
}
