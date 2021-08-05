import { Observer } from '../observer';

export const fromEvent = (target: Element | Window | Document, name: string) =>
	new Observer<Event>((next) => target.addEventListener(name, next));
