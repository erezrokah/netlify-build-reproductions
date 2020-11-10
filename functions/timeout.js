exports.handler = async () => {
  await new Promise((r) => setTimeout(r, 20_000));
  return { statusCode: 200, body: 'index.js' };
};
