import createAssertion from './createAssertion.ts';
import { BooleanFunction } from './types.ts';

export default function is<T>(
  param: any,
) {
  let callback: BooleanFunction;
  const type = typeof param;

  switch (type) {
    case 'function': {
      callback = param;
      break;
    }
    case 'object': {
      callback = x => Object.keys(param).every(key => {
        const item = param[key];

        return typeof item === 'function'
          ? item(x[key])
          : x[key] = item;
      })
      break;
    }
    case 'string':
    case 'number': {
      callback = x => x.type === param;
      break;
    }
    default: {
      callback = x => x === param;
      break;
    }
  }

  return createAssertion<T>(callback);
}
