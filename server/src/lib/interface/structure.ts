import Structure from '../structure';
import NodeArray from '../structure/nodeArray';

export const generateRandomStructure: Record<
  string,
  () => [Structure, unknown]
> = {
  array: NodeArray.generateRandom,
};

export const createStructureFromData: Record<
  string,
  (d: unknown) => Structure
> = {
  array: NodeArray.fromData,
};

export function isStructure(structureName: string) {
  switch (structureName) {
    case 'array':
      return true;
    default:
      return false;
  }
}
