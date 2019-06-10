const path = require('path');
const dotenv = require('dotenv');

const getOptimization = require('./webpack.optimization');
const getModule = require('./webpack.module');
const getResolve = require('./webpack.resolve');

dotenv.config();

const { NODE_ENV } = process.env;

if (!NODE_ENV) {
  throw new Error('NODE_ENV is not set. You should fix it before continue.');
} else if (!['development', 'production', 'test'].includes(NODE_ENV)) {
  throw new Error(`"${NODE_ENV}" is not a valid NODE_ENV value!`);
}

module.exports = (env) => ({
  mode: env.production ? 'production' : 'development',
  entry: path.resolve('src', 'index.js'),
  output: {
    path: path.resolve('lib'),
    filename: 'brandgility-embedded-api.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  optimization: getOptimization(env),
  module: getModule(env),
  resolve: getResolve(env),
  performance: {
    hints: false,
  },
  stats: {
    chunks: false,
    maxModules: 0,
    children: false,
    hash: false,
    version: false,
  },
});
