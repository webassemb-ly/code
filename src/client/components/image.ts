import { h } from '../../util/mod.ts';

interface FrameProps {
  src: string,
  alt?: string,
}

export default function frame({
  src,
  alt,
}: FrameProps) {
  return h.img(
    {
      src,
      alt,
    },
  );
}