import { GreetingService } from '../types';

export const mockGreetingService = (): jest.Mocked<GreetingService> => {
  return {
    sayHallo: jest.fn(),
  };
};
