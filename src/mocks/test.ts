import { faker } from "@faker-js/faker";
import {
  APIGatewayEventIdentity,
  APIGatewayEventRequestContextWithAuthorizer,
} from "aws-lambda";

type User = {};

const mockAPIGatewayEventIdentity = (): APIGatewayEventIdentity => {
  return {
    accessKey: null,
    accountId: null,
    apiKey: null,
    apiKeyId: null,
    caller: null,
    clientCert: null,
    cognitoAuthenticationProvider: null,
    cognitoAuthenticationType: null,
    cognitoIdentityId: null,
    cognitoIdentityPoolId: null,
    principalOrgId: null,
    sourceIp: faker.internet.ipv4(),
    user: null,
    userAgent: null,
    userArn: null,
  };
};
export const mockAPIGatewayEventRequestContextWithAuthorizer = <
  TAuthorizerContext
>({
  principalId,
  user,
}: {
  principalId?: string;
  user?: User;
} = {}): APIGatewayEventRequestContextWithAuthorizer<TAuthorizerContext> => {
  return {
    accountId: faker.string.uuid(),
    apiId: faker.string.uuid(),
    authorizer: {
      principalId,
      userString: JSON.stringify(user),
    } as TAuthorizerContext,
    //connectedAt?: number | undefined;
    //connectionId?: string | undefined;
    //domainName?: string | undefined;
    //domainPrefix?: string | undefined;
    //eventType?: string | undefined;
    //extendedRequestId?: string | undefined;
    protocol: faker.internet.protocol(),
    httpMethod: faker.internet.httpMethod(),
    identity: mockAPIGatewayEventIdentity(),
    //messageDirection?: string | undefined;
    //messageId?: string | null | undefined;
    path: faker.string.sample(),
    stage: faker.helpers.arrayElement(["prod", "stg", "dev"]),
    requestId: faker.string.uuid(),
    //requestTime?: string | undefined;
    requestTimeEpoch: faker.number.int(),
    resourceId: faker.string.uuid(),
    resourcePath: faker.word.sample(),
    //routeKey?: string | undefined;
  };
};
