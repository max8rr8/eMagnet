const { merge } = require('webpack-merge')
const webpack = require('webpack')

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
  },
  externals: {
    // Possible drivers for knex - we'll ignore them
    // comment the one YOU WANT to use
    sqlite3: 'sqlite3',
    mysql2: 'mysql2',
    mariasql: 'mariasql',
    mysql: 'mysql',
    mssql: 'mssql',
    oracle: 'oracle',
    'strong-oracle': 'strong-oracle',
    oracledb: 'oracledb',
    // pg: 'pg', // << using this one
    'pg-query-stream': 'pg-query-stream',
    'pg-native': 'pg-query-stream',
    tedious: 'tedious',
    'mssql/lib/base': 'mssql/lib/base',
    'mssql/package.json': '{}'
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
