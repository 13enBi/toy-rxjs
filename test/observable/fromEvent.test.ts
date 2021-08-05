import { fromEvent } from '../../src/observable/fromEvent';

describe('fromEvent', () => {
	it('should work', () => {
		const div = document.createElement('div');

		fromEvent(div, 'click').subscribe((event) => {
			expect(event.target).toBe(div);
		});

		div.click();
	});
});
