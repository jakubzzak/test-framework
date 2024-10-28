import { APIGatewayProxyHandler } from 'aws-lambda';
import { Greet } from '../../domains/greet';

interface Deps {
  greet: Greet;
}

export default function createHandler(deps: Deps): APIGatewayProxyHandler {
  return async ({ headers, queryStringParameters }) => {
    const actor = headers?.['x-test-framework-actor'];
    if (!actor) {
      return response(400, {
        message: 'Header<x-test-framework-actor> is required',
      });
    }

    if (!queryStringParameters?.name) {
      return response(400, {
        message: 'QueryStringParameter<name> is required',
      });
    }

    try {
      const greeting = await deps.greet({
        name: queryStringParameters.name,
        metadata: { actor },
      });
      return response(200, { data: { greeting } });
    } catch (error) {
      return response(500, { message: 'internal error' });
    }
  };
}

const response = (code: number, body: object) => {
  return {
    statusCode: code,
    body: JSON.stringify(body),
  };
};
