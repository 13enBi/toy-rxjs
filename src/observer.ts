import { Operate, pipe } from './operate';
import { OnNext, Subscriber } from './subscriber';

export type Next<T = any> = (value: T) => void;

export class Observer<T> extends Subscriber<T> {
	constructor(protected observe: (next: Next<T>) => void) {
		super();
	}

	pipe(...operates: Operate[]) {
		return pipe(...operates)(this);
	}
}
