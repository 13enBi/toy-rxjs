import { Observer } from '../src/observer';
import { filter, map } from '../src/operate';

describe('observer', () => {
	it('should work', () => {
		const dummy: number[] = [];

		new Observer<number>((next) => {
			[1, 2, 3, 4, 5].forEach(next);
		}).subscribe((value) => {
			dummy.push(value);
		});

		expect(dummy).toEqual([1, 2, 3, 4, 5]);
	});

	it('pipe', () => {
		const dummy: number[] = [];

		new Observer<number>((next) => {
			[1, 2, 3, 4, 5].forEach(next);
		})
			.pipe(
				map((v) => v + 1),
				filter((v) => v % 2 == 0)
			)
			.subscribe((value) => {
				dummy.push(value);
			});

		expect(dummy).toEqual([2, 4, 6]);
	});

	it('async iterator', async () => {
		const ob = new Observer<number>((next) => {
			[1, 2, 3, 4, 5].forEach(next);
		});
		
		for await (const iterator of ob as any) {
			console.log(iterator);
		}
	});
});

