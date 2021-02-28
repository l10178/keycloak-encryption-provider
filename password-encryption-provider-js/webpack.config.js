const path = require('path');
module.exports = {
  mode: 'production', //production or development
  entry: './index.js',
  output: {
    filename: 'password-encryption-provider.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
