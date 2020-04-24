import { h, AbstractNode, Branch } from '../../util/mod.ts';

interface FrameProps {
  children?: Branch,
}

export default function frame({
  children,
}: FrameProps) {
  return h.div('test');
}