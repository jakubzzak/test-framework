/* eslint-disable jest/no-export */
/* eslint-disable jest/no-conditional-expect */
import { DomainTestContext, defaultContext } from './domain.context';

export const itThrowsErrorIfDepsFail = (
	createContext: () => Partial<DomainTestContext>,
) => {
	const ctx = defaultContext(createContext());

	it.each(Object.keys(ctx.deps))(
		`throws an error if deps.%s fails`,
		async (failedDep) => {
			Object.keys(ctx.deps).forEach((depKey) => {
				if (depKey === failedDep) {
					ctx.deps[depKey].func.mockRejectedValueOnce(new Error('Ups!'));
				} else {
					ctx.deps[depKey].func.mockResolvedValueOnce(ctx.deps[depKey].res);
				}
			});

			const op = ctx.domainFunc(ctx.input);

			await expect(() => op).rejects.toThrow(new Error('Ups!'));
		},
	);
};

export const runsSuccessfully = (
	createContext: () => Partial<DomainTestContext>,
) => {
	it('runs successfully', async () => {
		const ctx = defaultContext(createContext());
		Object.entries(ctx.deps).forEach(([_, { func, res }]) =>
			func.mockResolvedValueOnce(res),
		);

		const res = await ctx.domainFunc(ctx.input);

		Object.entries(ctx.deps).forEach(
			([_, { func, calledTimes, calledWith }]) => {
				if (calledTimes !== undefined) {
					expect(func).toHaveBeenCalledTimes(calledTimes);
				}
				if (calledWith) {
					expect(func).toHaveBeenCalledWith(...calledWith);
				}
			},
		);
		expect(res).toEqual(ctx.response);
	});
};
