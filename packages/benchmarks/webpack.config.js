const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const appDirectory = path.resolve(__dirname);

module.exports = /** @type {import('webpack').Configuration} */ ({
  mode: 'production',
  devtool: 'source-map',
  context: __dirname,
  entry: './src/index',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[hash:base64:8]'
              }
            }
          }
        ]
      },
      {
        test: /\.[j|t]sx?$/,
        include: [path.resolve(appDirectory, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            extends: path.resolve(appDirectory, '../../configs/babel.config')
          }
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});
