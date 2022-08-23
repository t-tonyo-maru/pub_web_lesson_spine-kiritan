// node
const path = require('path')
// lib
const Dotenv = require('dotenv-webpack')

module.exports = (env, args) => {
  const mode = args.mode || 'development'

  return {
    mode,
    target: ['browserslist'],
    entry: {
      main: `./src/ts/main.ts`
    },
    output: {
      filename: '[name].js',
      path: `${__dirname}/dist/assets/js`
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: [/node_modules/]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, `.env.${mode}`)
      })
    ]
  }
}
