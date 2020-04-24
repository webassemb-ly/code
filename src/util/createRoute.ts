/**
 * @author Hans Oksendahl
 */
import createWhich from './createWhich.ts';
import { AnyFunction, WithFallback } from './types.ts';

type Methods = Record<string, AnyFunction>;

/**
 * Create a routing function.
 * 
 * @param methods
 */
export default function createRoute<T extends Methods>(
  methods: T,
): <U extends keyof T>(key: U, params: Parameters<T[U]>) => ReturnType<T[U]>
export default function createRoute<T extends Methods, U extends string>(
  methods: T,
  defaultKey: U,
): <V extends string>(key: V, params: Parameters<WithFallback<T, V, U>>) => ReturnType<WithFallback<T, V, U>>
export default function createRoute<T extends Methods>(
  methods: T,
) {
  const which = createWhich(methods);

  return <U extends string>(
    key: U,
    params: Parameters<T[U]>
  ) => which(key)(...params);
}
