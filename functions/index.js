/* eslint-disable no-console */
import axios from 'axios';
import { getIndexId } from './constants/index';
import { getViewsPayload } from './functions/index';

const elasticHost = process.env.ELASTIC_HOST;
const elasticUser = process.env.ELASTIC_USER;
const elasticPassword = process.env.ELASTIC_PASSWORD;

import * as Sentry from '@sentry/node';
const { initSentry } = require('./functions/sentry.js');
initSentry();

exports.handler = async (event) => {
  const docId = event.queryStringParameters['id'];

  const url = new URL(event.headers.referer);
  let indexId = event.queryStringParameters['index'];
  if (indexId !== 'sellers') {
    indexId = getIndexId(url.hostname, indexId);
  }

  Sentry.configureScope((scope) => {
    scope.setLevel('error');
    scope.setTag('endpoint', 'doc');
    scope.setExtra('docId', docId);
    scope.setExtra('index', indexId);
    scope.setExtra('httpMethod', event.httpMethod);
  });

  let responseData;
  try {
    const elasticResponse = await axios.get(
      `${elasticHost}/${indexId}/_doc/${docId}`,
      {
        auth: {
          username: elasticUser,
          password: elasticPassword,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    responseData = { ...elasticResponse.data };
    // Remove restricted data
    delete responseData._source.restrictedData;
  } catch (error) {
    console.log(error);
    Sentry.captureMessage(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
  try {
    const payload = getViewsPayload(url, responseData._source);
    await axios.post(`${elasticHost}/${indexId}/_update/${docId}`, payload, {
      auth: {
        username: elasticUser,
        password: elasticPassword,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    Sentry.captureMessage(error);
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(responseData),
  };
};
