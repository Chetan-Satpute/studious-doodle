import Structure from '../structure';
import NodeArray from '../structure/nodeArray';

export const generateRandomStructure: Record<
  string,
  () => [Structure, unknown]
> = {
  array: NodeArray.generateRandom,
};

export function isStructure(structureName: string) {
  switch (structureName) {
    case 'array':
      return true;
    default:
      return false;
  }
}
