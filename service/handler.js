'use strict';

const fetcher = require('./fetcher');
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

module.exports.fetch = (event, context, callback) => {
  const url = decodeURIComponent(event.queryStringParameters.url);

  fetcher(url).then(html => {
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify({ html }),
    };

    callback(null, response);
  }).catch(reason => {
    const response = {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        reason,
      }),
    };

    callback(null, response);
  });
};
