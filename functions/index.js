const fetch = require('node-fetch');

const { logHello } = require('../utils');

exports.handler = async () => {
  const response = await fetch('https://www.google.com');
  return { statusCode: 200, body: await response.text() };
};
