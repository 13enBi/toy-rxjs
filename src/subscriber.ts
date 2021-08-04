import { isFunction } from './utils';

export type OnNext<T, R> = (value: T, subscriber: Subscriber<R>) => void;

export class Subscriber<T = any> {
	protected subscriber?: Subscriber;

	constructor(protected onNext?: OnNext<T, any>) {}

	next(value: T) {
		this.onNext ? this.onNext(value, this.subscriber!) : this.subscriber?.next(value);
	}

	subscribe<R = any>(subscriber: Subscriber<R> | OnNext<T, R>): Subscriber<R> {
		this.subscriber = isFunction(subscriber) ? new Subscriber(subscriber) : subscriber;

		return this.subscriber;
	}
}
