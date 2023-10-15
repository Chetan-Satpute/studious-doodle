import Structure from '../structure';
import NodeArray from '../structure/nodeArray';

export const generateRandomStructure: Record<
  string,
  () => [Structure, unknown]
> = {
  array: NodeArray.generateRandom,
};
