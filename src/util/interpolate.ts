/**
 * @author Hans Oksendahl
 */
import orderedPair from './orderedPair.ts';

/**
 * Interpolate a value between `a` and `b` based on normalized value `n`.
 * 
 * @param a A numeric operand
 * @param b A numeric operand
 */
export default function interpolate(
  a: number,
  b: number,
) {
  const [min, max] = orderedPair(a, b);
  const d = max - min;

  return (n: number) => (
    n >= 1
      ? max
      : min + n * d
  );
}