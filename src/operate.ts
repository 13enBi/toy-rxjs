import { Next, Observer } from './observer';

type OperateInit<T = any, R = any> = (value: T, Next: Next<R>) => void;

export type Operate<T = any, R = any> = (source: Observer<T>) => Observer<R>;

export const operate =
	<T, R>(init: OperateInit<T, R>): Operate<T, R> =>
	(source) =>
		new Observer((next) => source.subscribe((value) => init(value, next)));

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
	<T>(source: Observer<T>) =>
		operates.reduce((prev, operate) => operate(prev), source);
