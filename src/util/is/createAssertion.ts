import { BooleanFunction } from './types.ts';

export default function createAssertion<T>(
    callback: BooleanFunction
) {
    return (value: any): value is T => callback(value);
}
