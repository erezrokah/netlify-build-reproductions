module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    netlifyConfig.functionsDirectory = 'new_functions';
  },
};
