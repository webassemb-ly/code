import { h, AbstractNode, AnyFunction } from '../../util/mod.ts';
import getPhi from './util/getPhi.ts';

interface ParaProps {
  children?: AbstractNode,
  onclick?: AnyFunction
  color?: string,
  size?: number,
}

export default function para({
  children,
  onclick,
  color = 'brown',
  size = 0,
}: ParaProps) {
  return h.p(
    {
      style: {
        color,
        fontSize: `${getPhi(size)}rem`
      },
      onclick,
    },
    children,
  );
}