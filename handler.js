'use strict';

const aws = require('aws-sdk');

const createApiAiResponse = (params) => {
  const baseResponse = {
    speech: 'Yes how can I help?',
    displayText: 'Yes how can I help?',
    data: {},
    contextOut: [],
    source: 'Somewhere only we know'
  };
  return Object.assign(baseResponse, params);
};

module.exports.route = (event, context, callback) => {
  const lambda = new aws.Lambda({
    region: 'ap-southeast-1'
  });

  const body = JSON.parse(event.body);
  const action = body.result.action;

  let handler;

  switch (action) {
    case 'book_meeting_room':
        handler = 'hey-office-service-rooms-dev-rooms';
      break;
    default:
  }

  if (handler) {
    lambda.invoke({
      FunctionName: handler,
      Payload: JSON.stringify(body)
    }, (err, data) => {
      let message = 'Unable to process your request';
      if (data) {
        message = JSON.parse(data.Payload).body.message;
      }

      const serviceResponse = {
        speech: message,
        displayText: message,
      };

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(createApiAiResponse(serviceResponse))
      });
    });
  } else {
    console.log('default response');
    const response = {
      statusCode: 200,
      body: JSON.stringify(createApiAiResponse())
    };

    callback(null, response);
  }
};
