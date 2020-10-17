const { merge } = require('webpack-merge')

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.graphql?$/,
        use: [
          {
            loader: 'webpack-graphql-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    mainFields: ['main', 'module'],
    extensions: ['.js', '.json', '.jsx']
  },
  stats: {
    colors: true
  },
  devtool: false,
  experiments: {
    topLevelAwait: true
  }
}

module.exports = [
  merge(baseConfig, {
    entry: './src/frontend.js',
    target: 'web',
    output: {
      filename: 'public/bundle.js'
    }
  }),
  merge(baseConfig, {
    entry: './src/backend.js',
    target: 'node',
    output: {
      filename: 'index.js'
    }
  })
]
