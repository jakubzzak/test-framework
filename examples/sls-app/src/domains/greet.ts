import { GreetingService } from '../types';

type Deps = {
  greetingService: GreetingService;
};
type Input = {
  name?: string;
  metadata: { actor: string };
};

export type Greet = (input: Input) => Promise<string>;
export default function greet(deps: Deps): Greet {
  return async ({ name }: Input) => {
    if (!name) {
      throw new Error('Name is required');
    }

    return await deps.greetingService.sayHallo(name);
  };
}
