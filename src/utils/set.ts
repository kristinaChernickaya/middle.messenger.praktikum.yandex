import { Indexed } from '../types';
import { merge } from './merge';

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>((acc, currentValue) => {
    return {
      [currentValue]: acc,
    };
  }, value as any);

  return merge(object as Indexed, result);
}
