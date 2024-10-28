import {
  DomainTestContext,
  itThrowsErrorIfDepsFail,
  runsSuccessfully,
} from '../../../../src/domain';
import { mockGreetingService } from '../mocks/services';
import greet from './greet';

describe('greet', () => {
  const context = (
    overrideContext: Partial<DomainTestContext> = {},
  ): Partial<DomainTestContext> => {
    const greetingService = mockGreetingService();

    return {
      input: {
        name: 'Ali',
      },
      deps: {
        'greetingService.sayHallo': {
          func: greetingService.sayHallo,
          calledTimes: 1,
          calledWith: ['Ali'],
          res: 'hallo Ali',
        },
      },
      domainFunc: greet({
        greetingService,
      }),
      response: 'hallo Ali',
      ...overrideContext,
    };
  };

  itThrowsErrorIfDepsFail(context);
  runsSuccessfully(context);
});
