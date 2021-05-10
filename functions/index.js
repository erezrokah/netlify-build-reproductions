exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      URL: process.env.URL,
      DEPLOY_URL: process.env.DEPLOY_URL,
      DEPLOY_PRIME_URL: process.env.DEPLOY_PRIME_URL,
    }),
  };
};
