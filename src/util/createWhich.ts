import { WithFallback } from './types.ts';

/**
 * A `which` is like a `switch` statement that uses object lookups.
 * 
 * Unlike a `switch` statement in a function the return result of a `which` is
 * deterministic preserving type information.
 * 
 * @param {object} ref
 * @param {string} [defaultKey]
 */
export default function createWhich<T extends object>(
  ref: T,
): <U extends keyof T>(key: U) => T[U]
export default function createWhich<T extends object, U extends keyof T>(
  ref: T,
  defaultKey: U,
): <V extends string>(key?: V) => WithFallback<T, V, U>
export default function createWhich<T extends object>(
  ref: T,
  defaultKey?: any,
): any {
  return (
    key: string
  ) => (
    defaultKey
      ? ref[key] || defaultKey && ref[defaultKey]
      : ref[key]
  );
}
