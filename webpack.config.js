const path = require('path');

module.exports = {
  // other webpack configurations
  resolve: {
    fallback: {
      assert: require.resolve('assert/'),
    },
  },
};
