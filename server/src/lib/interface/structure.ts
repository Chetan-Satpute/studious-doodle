import Structure from '../structure';
import BinarySearchTree from '../structure/binarySearchTree';
import LinkedList from '../structure/linkedList';
import NodeArray from '../structure/nodeArray';

export const generateRandomStructure: Record<string, () => Structure> = {
  array: NodeArray.generateRandom,
  linkedList: LinkedList.generateRandom,
  binarySearchTree: BinarySearchTree.generateRandom,
};

export const createStructureFromData: Record<
  string,
  (d: unknown) => Structure
> = {
  array: NodeArray.fromData,
  linkedList: LinkedList.fromData,
  binarySearchTree: BinarySearchTree.fromData,
};

export function isStructure(structureName: string) {
  switch (structureName) {
    case 'array':
    case 'linkedList':
    case 'binarySearchTree':
      return true;
    default:
      return false;
  }
}
