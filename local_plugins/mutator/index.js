module.exports = {
  async onPostBuild({ netlifyConfig }) {
    netlifyConfig.redirects.push({
      from: '/other-api',
      to: '/.netlify/functions/:splat',
      status: 200,
    });
  },
};
