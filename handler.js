'use strict';

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
  const body = JSON.parse(event.body);
  const action = body.result.action;

  const serverlessResponse = {
    speech: `You asked for ${action} action`,
    displayText: `You asked for ${action} action`
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(createApiAiResponse(serverlessResponse))
  };

  callback(null, response);
};
