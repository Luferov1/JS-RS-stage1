/* eslint-disable */
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: true,
    compress: true,
    static: {
      directory: path.join(__dirname, './dist'),
    },
  },
};

/* eslint-enable */
