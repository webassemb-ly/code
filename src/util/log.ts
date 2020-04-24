import { AnyFunction } from './types.ts';

function createEffect<T extends AnyFunction>(
  effect: T,
): (..._: Parameters<T>) => void {
  return (...params: Parameters<T>) => effect(...params);
}