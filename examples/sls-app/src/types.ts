export interface GreetingService {
  sayHallo(name: string): Promise<string>;
}
