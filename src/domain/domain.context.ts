import { name as projectName } from './../../package.json';

type TestContextDependency = {
  func: jest.Mocked<any>;
  calledWith?: any[];
  calledTimes?: number;
  res: any;
};
type DomainFunction = (input?: any) => Promise<any>;
export type DomainTestContext = {
  input: object;
  deps: Record<string, TestContextDependency>;
  domainFunc: DomainFunction;
  response: any;
};

export const defaultContext = (
  overrideContext: Partial<DomainTestContext>,
): DomainTestContext => {
  const mockedDomainFunc = (): any => {
    throw new Error('DomainFunction not implemented!');
  };
  const mockedInput = () => {
    return { metadata: { actor: `domain-test@${projectName}.com` } };
  };

  return {
    input: overrideContext.input ?? mockedInput(),
    deps: overrideContext.deps ?? {},
    domainFunc: overrideContext.domainFunc ?? mockedDomainFunc(),
    response: overrideContext.response,
  };
};
