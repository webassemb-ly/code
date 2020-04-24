import { AnyFunction } from './types';
import is from './is/mod.ts';

export default is<AnyFunction>((x: any) => typeof x === 'function');