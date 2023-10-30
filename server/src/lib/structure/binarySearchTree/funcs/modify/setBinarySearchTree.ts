import BinarySearchTree from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

const setBinarySearchTree: TExecutionFunction = async (
  board,
  args,
  animate
) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;
  const values = args.values as number[];

  if (!animate) {
    await _setBinarySearchTree(board, tree, values);
  }
};

async function _setBinarySearchTree(
  _board: Board,
  tree: BinarySearchTree,
  values: number[]
) {
  tree.root = null;

  for (const value of values) {
    tree.insert(value);
  }

  tree.rearrange();
}

export default setBinarySearchTree;
