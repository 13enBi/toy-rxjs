import { Next } from './observer';
import { Subscriber } from './subscriber';

type OperateInit<T = any, R = any> = (value: T, Next: Next<R>) => void;

export type Operate<T = any, R = any> = (source: Subscriber<T>) => Subscriber<R>;

export const operate =
	<T, R>(init: OperateInit<T, R>): Operate<T, R> =>
	(source) =>
		source.subscribe((value, subscriber) => init(value, subscriber.next.bind(subscriber)));

export const map = <T, R>(project: (value: T, index: number) => R) =>
	operate<T, R>((value, next) => {
		let index = 0;

		next(project(value, index));
	});

export const filter = <T>(predicate: (value: T, index: number) => boolean) =>
	operate<T, T>((value, next) => {
		let index = 0;

		predicate(value, index) && next(value);
	});

export const tap = <T>(tap: (value: T, index: number) => any) =>
	operate<T, T>((value, next) => {
		let index = 0;

		tap(value, index);
		next(value);
	});

export const pipe =
	(...operates: Operate[]) =>
	<T>(source: Subscriber<T>) =>
		operates.reduce((prev, operate) => operate(prev), source);
