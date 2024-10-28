import { GreetingService } from '../types';

export class MyGreetingService implements GreetingService {
  sayHallo = async (name: string): Promise<string> => {
    return `Hello, ${name}!`;
  };
}
