import { CompareFunction } from './types.ts';

function defaultOrdering(
  a: any,
  b: any,
) {
  return a < b;
}

export default function orderedPair<T extends any, U extends any>(
  a: T,
  b: U,
  ordering: CompareFunction<T, U> = defaultOrdering,
) {
  return ordering(a, b)
    ? [a, b]
    : [b, a];
}