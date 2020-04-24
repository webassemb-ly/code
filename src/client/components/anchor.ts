import { h, AbstractNode, AnyFunction, TextValue } from '../../util/mod.ts';
import getPhi from './util/getPhi.ts';
import { AnyChild } from '../../util/vdom/chest/types.ts';

interface AnchorProps {
  href: string,
  onclick?: AnyFunction,
  children?: AnyChild,
  color?: string,
  size?: number,
}

export default function anchor({
  href,
  children,
  onclick,
  color = '#ff00ff',
  size = 0,
}: AnchorProps) {
  return h.a(
    {
      href,
      style: {
        color,
        fontSize: `${getPhi(size)}rem`
      },
      onclick,
    },
    children
  );
}