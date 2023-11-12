import BinarySearchTree from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

export const generateRandom: TExecutionFunction = async (
  board,
  _args,
  animate
) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;

  if (!animate) {
    _generateRandom(board, tree);
  }
};

async function _generateRandom(board: Board, _tree: BinarySearchTree) {
  const randomTree = BinarySearchTree.generateRandom();
  randomTree.moveTo(100, 100);
  board.setPrimaryStructure(randomTree);
}

export default generateRandom;
