module.exports = (env) => ({
  rules: [
    {
      test: /\.js$/,
      include: /src/,
      loader: 'babel-loader',
      options: { cacheDirectory: env.development },
    },
  ],
});
