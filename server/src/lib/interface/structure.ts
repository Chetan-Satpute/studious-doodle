import Structure from '../structure';
import LinkedList from '../structure/linkedList';
import NodeArray from '../structure/nodeArray';

export const generateRandomStructure: Record<string, () => Structure> = {
  array: NodeArray.generateRandom,
  linkedList: LinkedList.generateRandom,
};

export const createStructureFromData: Record<
  string,
  (d: unknown) => Structure
> = {
  array: NodeArray.fromData,
  linkedList: LinkedList.fromData,
};

export function isStructure(structureName: string) {
  switch (structureName) {
    case 'array':
    case 'linkedList':
      return true;
    default:
      return false;
  }
}
