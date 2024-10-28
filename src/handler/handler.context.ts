import { name as projectName } from './../../package.json';

import {
  APIGatewayEventDefaultAuthorizerContext,
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyEventHeaders,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
  APIGatewayProxyHandler,
} from 'aws-lambda';
import { mockAPIGatewayEventRequestContextWithAuthorizer } from '../mocks/test';

type TestContextDependency = {
  func: any;
  inSync?: boolean;
  calledTimes?: number;
  calledWith?: any;
  res: any;
  skip?: boolean;
};
export type HandlerTestContext = {
  requestContext: APIGatewayEventRequestContextWithAuthorizer<APIGatewayEventDefaultAuthorizerContext>;
  headers: APIGatewayProxyEventHeaders;
  pathParams: APIGatewayProxyEventPathParameters;
  queryParams: APIGatewayProxyEventQueryStringParameters;
  body: object;
  deps: Record<string, TestContextDependency>;
  handler: APIGatewayProxyHandler;
  response: object | null;
};

export const defaultContext = (
  overrideContext: Partial<HandlerTestContext>,
): HandlerTestContext => {
  const mockedHandler = (): APIGatewayProxyHandler => {
    throw new Error('Handler not implemented!');
  };

  return {
    headers: overrideContext.headers ?? {
      [`x-${projectName}-actor`]: `handler-test@${projectName}.com`,
    },
    requestContext:
      overrideContext.requestContext ??
      mockAPIGatewayEventRequestContextWithAuthorizer(),
    pathParams: overrideContext.pathParams ?? {},
    queryParams: overrideContext.queryParams ?? {},
    body: overrideContext.body ?? {},
    deps: overrideContext.deps ?? {},
    handler: overrideContext.handler ?? mockedHandler(),
    response: overrideContext.response || null,
  };
};
