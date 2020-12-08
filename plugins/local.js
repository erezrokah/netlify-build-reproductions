const fs = require('fs');
module.exports = {
  onPreBuild: () => {
    const files = fs.readdirSync('.netlify/plugins/node_modules');
    console.log('onPreBuild', JSON.stringify(files, null, 2));
  },
};
