import { Operate, pipe } from './operate';
import { Subscriber } from './subscriber';
import { isFunction } from './utils';

export type Next<T = any> = (value: T) => void;

export class Observer<T> {
	constructor(protected observe: (next: Next<T>) => void) {}

	pipe(...operates: Operate[]): Observer<any> {
		return pipe(...operates)(this);
	}

	subscribe(observer: Subscriber | ((value: T) => void)): Subscriber {
		const subscriber = isFunction(observer) ? new Subscriber(observer) : observer;

		this.observe((value) => subscriber.next(value));

		return subscriber;
	}
}
