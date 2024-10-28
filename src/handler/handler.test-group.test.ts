/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-export */
import { Context, Handler } from 'aws-lambda';
import { name as projectName } from '../../package.json';
import { mockAPIGatewayEventRequestContextWithAuthorizer } from '../mocks/test';
import { HandlerTestContext, defaultContext } from './handler.context';

const actorHeaderKey = `x-${projectName}-actor`;

async function invoke<E, R>(
  handler: Handler<E, R>,
  event: Partial<E>,
): Promise<R> {
  const context = {} as Context;
  const res = await (handler(event as E, context, () => ({})) as Promise<R>);
  return res;
}

const mapActor = (ctx: HandlerTestContext) => {
  if (ctx.requestContext.authorizer?.principalId) {
    return `User<${ctx.requestContext.authorizer?.principalId}>`;
  }
  return ctx.headers[actorHeaderKey];
};

export const itThrowsErrorIfActorHeaderIsMissing = (
  createContext: () => Partial<HandlerTestContext>,
) => {
  it(`throws an error if Header<${actorHeaderKey}> is missing`, async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, { headers: {} });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `Header<${actorHeaderKey}> is required`,
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfPrincipalIdIsMissing = (
  createContext: () => Partial<HandlerTestContext>,
) => {
  it('throws an error if principalId is missing', async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      requestContext: mockAPIGatewayEventRequestContextWithAuthorizer(),
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: 'principalId is required',
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfPathParamIsMissing = (
  createContext: () => Partial<HandlerTestContext>,
  pathParam: string,
) => {
  it(`throws an error if PathParam<${pathParam}> is missing`, async () => {
    const ctx = defaultContext(createContext());
    delete ctx.pathParams[pathParam];

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `PathParameter<${pathParam}> is required`,
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfPathParamIsNotNumber = (
  createContext: () => Partial<HandlerTestContext>,
  pathParam: string,
) => {
  it(`throws an error if PathParam<${pathParam}> is not a number`, async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: {
        ...ctx.pathParams,
        [pathParam]: 'not-a-number',
      },
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `PathParameter<${pathParam}> is not a number`,
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfPrincipalIdAndPathParamDoNotMatch = (
  createContext: () => Partial<HandlerTestContext>,
  pathParam: string,
) => {
  it(`throws an error if principalId & PathParam<${pathParam}> do not match`, async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: mockAPIGatewayEventRequestContextWithAuthorizer({
        principalId: '1',
      }),
      pathParameters: {
        ...ctx.pathParams,
        [pathParam]: '2',
      },
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `user is not allowed to carry out this action`,
      }),
    );
    expect(res.statusCode).toEqual(403);
  });
};

export const itThrowsErrorIfQueryParamIsMissing = (
  createContext: () => Partial<HandlerTestContext>,
  queryParam: string,
) => {
  it(`throws an error if QueryStringParam<${queryParam}> is missing`, async () => {
    const ctx = defaultContext(createContext());
    delete ctx.queryParams[queryParam];

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
      queryStringParameters: ctx.queryParams,
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `QueryStringParameter<${queryParam}> is required`,
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfQueryParamIsNotNumber = (
  createContext: () => Partial<HandlerTestContext>,
  queryParam: string,
) => {
  it(`throws an error if QueryStringParam<${queryParam}> is not a number`, async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
      queryStringParameters: {
        ...ctx.queryParams,
        [queryParam]: 'not-a-number',
      },
    });

    expect(res.body).toEqual(
      JSON.stringify({
        message: `QueryStringParameter<${queryParam}> is not a number`,
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfBodyIsNotJson = (
  createContext: () => Partial<HandlerTestContext>,
) => {
  it('throws an error if body is not json', async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
      queryStringParameters: ctx.queryParams,
      body: `"`,
    });

    expect(res.body).toEqual(JSON.stringify({ message: 'body is not json' }));
    expect(res.statusCode).toBe(400);
  });
};

export const itThrowsErrorIfBodyIsInvalid = (
  createContext: () => Partial<HandlerTestContext>,
  invalidBody: object,
) => {
  it('throws an error if body is invalid', async () => {
    const ctx = defaultContext(createContext());

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
      queryStringParameters: ctx.queryParams,
      body: JSON.stringify(invalidBody),
    });

    expect(JSON.parse(res.body)).toEqual(
      expect.objectContaining({
        message: 'invalid input',
        errors: expect.arrayContaining([]),
      }),
    );
    expect(res.statusCode).toEqual(400);
  });
};

export const itThrowsErrorIfDepsFail = (
  createContext: () => Partial<HandlerTestContext>,
) => {
  const ctx = defaultContext(createContext());

  it.each(Object.keys(ctx.deps).filter((dep) => !ctx.deps[dep].skip))(
    `throws an error if deps.%s fails`,
    async (failedDep) => {
      Object.keys(ctx.deps).forEach((depKey) => {
        if (depKey === failedDep) {
          ctx.deps[depKey].func.mockRejectedValue(
            new Error(`Ups! ${depKey} failed`),
          );
        } else {
          ctx.deps[depKey].func.mockResolvedValue(ctx.deps[depKey].res);
        }
      });

      const res = await invoke(ctx.handler, {
        headers: ctx.headers,
        requestContext: ctx.requestContext,
        pathParameters: ctx.pathParams,
        queryStringParameters: ctx.queryParams,
        body: JSON.stringify(ctx.body),
      });

      expect(res.body).toEqual(
        JSON.stringify({
          message: 'internal error',
        }),
      );
      expect(res.statusCode).toEqual(500);
      if (
        ctx.deps[failedDep].calledTimes === undefined ||
        ctx.deps[failedDep].calledTimes
      ) {
        expect(ctx.deps[failedDep].func).toHaveBeenCalledWith(
          expect.objectContaining({
            metadata: expect.objectContaining({
              actor: mapActor(ctx),
            }),
          }),
        );
      }
    },
  );
};

export const runsSuccessfully = (
  createContext: () => Partial<HandlerTestContext>,
  statusCode = 200,
) => {
  it('runs successfully', async () => {
    const ctx = defaultContext(createContext());
    Object.entries(ctx.deps).forEach(([_, { func, inSync, res }]) => {
      if (inSync) {
        return func.mockReturnValue(res);
      }
      return func.mockResolvedValue(res);
    });

    const res = await invoke(ctx.handler, {
      headers: ctx.headers,
      requestContext: ctx.requestContext,
      pathParameters: ctx.pathParams,
      queryStringParameters: ctx.queryParams,
      body: JSON.stringify(ctx.body),
    });

    if (ctx.response) {
      expect(res.body).toEqual(JSON.stringify(ctx.response));
    }
    expect(res.statusCode).toEqual(statusCode);
    Object.entries(ctx.deps).forEach(
      ([_, { func, calledTimes, calledWith, skip }]) => {
        if (calledTimes !== undefined) {
          expect(func).toHaveBeenCalledTimes(calledTimes);
        }
        if (!skip && (calledTimes === undefined || calledTimes > 0)) {
          expect(func).toHaveBeenCalledWith(
            expect.objectContaining({
              metadata: expect.objectContaining({
                actor: mapActor(ctx),
              }),
            }),
          );
        }
        //if (calledWith) { // soon
        //	expect(func).toHaveBeenCalledWith(...calledWith);
        //}
      },
    );
  });
};
