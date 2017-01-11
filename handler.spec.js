const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const aws = require('aws-sdk');
const route = require('./handler').route;

chai.use(sinonChai)
const expect = chai.expect

describe('route', () => {
  const stubInvoke = sinon.stub();
  sinon.stub(aws, 'Lambda', function() {
    this.invoke = stubInvoke;
  });

  it('should respond with default response for unrecognised action', sinon.test(function() {
    const event = {
      body: JSON.stringify({
        result: {
          action: 'unknown'
        }
      })
    };

    const expectedResponse = {
      statusCode: 200,
      body: JSON.stringify({
        speech: 'Yes how can I help?',
        displayText: 'Yes how can I help?',
        data: {},
        contextOut: [],
        source: 'Somewhere only we know'
      })
    }
    const callback = this.stub();
    route(event, null, callback);

    expect(callback).to.have.been.calledWith(null, expectedResponse);
  }));

  it('should invoke respective lambda for book_meeting_room action', sinon.test(function() {
    const event = {
      body: JSON.stringify({
        result: {
          action: 'book_meeting_room'
        }
      })
    };

    const expectedParams = {
      FunctionName: 'hey-office-service-rooms-dev-rooms',
      Payload: event.body
    };

    const callback = this.stub();
    route(event, null, callback);

    expect(stubInvoke).to.have.been.calledWith(expectedParams);
  }));
});
