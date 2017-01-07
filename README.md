# Hey Office Service Gateway

Hey Office Service webhook for API.AI built on AWS Lambda.

This gateway fulfills API.AI request by routing each action to its appropriate handler.

## Using https://serverless.com/

1. Install serverless `npm install -g serverless`
2. Set up serverless credentials with AWS key and secret `serverless config credentials --provider aws --key 1234 --secret 5678 --profile hey-office-service`
3. Deploy `serverless deploy`
