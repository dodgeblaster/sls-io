/**
 * SNS
 *
 * Formats events received by lambda functions
 * from SNS events
 *
 */
const sns = {
  input: x => {
    const snsMessage = x.Records[0].Sns;
    return JSON.parse(snsMessage.Message);
  }
};

/**
 * Dynamo Stream
 *
 * Formats events received by lambda functions
 * from Dynamo Stream events
 *
 */
const dynamoStream = {
  input: x => x.Records[0].dynamodb.NewImage
};

/**
 * API Gateway
 *
 * Formats events received by lambda functions
 * from API Gateway events
 *
 */
const http = {
  input: x => JSON.parse(x.body),

  output: x => ({
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
      "Access-Control-Allow-Headers": "Content-Type"
    },
    body: JSON.stringify(x)
  }),

  error400: x => ({
    statusCode: 400,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(x)
  }),

  error500: x => ({
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(x)
  })
};

module.exports = {
  http,
  dynamoStream,
  sns
};
