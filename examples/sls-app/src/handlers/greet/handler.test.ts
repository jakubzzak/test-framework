import {
  HandlerTestContext,
  itThrowsErrorIfActorHeaderIsMissing,
  itThrowsErrorIfDepsFail,
  itThrowsErrorIfQueryParamIsMissing,
  runsSuccessfully,
} from '../../../../../src/handler';
import createHandler from './handler';

describe('handlers.greet.handler', () => {
  const context = (
    overrideContext: Partial<HandlerTestContext> = {},
  ): Partial<HandlerTestContext> => {
    const greet = jest.fn();

    return {
      headers: {
        'x-test-framework-actor': 'test-actor',
      },
      queryParams: {
        name: `Ali`,
      },
      deps: {
        greet: {
          func: greet,
          res: 'hallo Ali',
        },
      },
      handler: createHandler({
        greet,
      }),
      response: { data: { greeting: 'hallo Ali' } },
      ...overrideContext,
    };
  };

  itThrowsErrorIfActorHeaderIsMissing(context);
  itThrowsErrorIfQueryParamIsMissing(context, 'name');
  itThrowsErrorIfDepsFail(context);
  runsSuccessfully(context);
});
