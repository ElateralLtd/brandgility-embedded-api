const TerserPlugin = require('terser-webpack-plugin');

const minimizer = new TerserPlugin({
  terserOptions: { parallel: true },
});

module.exports = () => ({
  minimizer: [minimizer],
});
