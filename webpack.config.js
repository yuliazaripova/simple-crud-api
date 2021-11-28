const path = require('path');

module.exports = {
  target: 'node',
  entry: './server.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
