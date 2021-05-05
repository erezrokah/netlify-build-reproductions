exports.handler = async () => {
  console.log({ NODE_ENV: process.env.NODE_ENV });
  return {
    statusCode: 200,
    body: JSON.stringify({ NODE_ENV: process.env.NODE_ENV }),
  };
};
