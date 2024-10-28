import greet from '../../domains/greet';
import { MyGreetingService } from '../../services/greeting-service';
import createHandler from './handler';

const greetingService = new MyGreetingService();

export const handler = createHandler({
  greet: greet({ greetingService }),
});
