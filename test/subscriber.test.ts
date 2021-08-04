import { Subscriber } from '../src/subscriber';

describe('Subscriber', () => {
	it('should work', () => {
		const start = new Subscriber();
		const arr = [1, 2, 3, 4, 5];
		const dummy: string[] = [];

		start
			.subscribe((v, s) => s.next(v + 1))
			.subscribe((v, s) => s.next(v * 2))
			.subscribe((v, s) => s.next(`${v}`))
			.subscribe((v) => {
				dummy.push(v);
			});

		arr.forEach((v) => start.next(v));

		expect(dummy).toEqual(['4', '6', '8', '10', '12']);
	});
});
