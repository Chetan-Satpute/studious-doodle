import BinarySearchTree, {BinarySearchTreeNode} from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'BINARY_SERACH_TREE_SEARCH';

const code = `
function search(tree, target) {
  if (tree.root === null) {
    // Not Found
    return false;
  }

  let ptr = tree.root;

  while (ptr !== null) {
    if (ptr.value === target) {
      // Found
      return true;
    } else if (ptr.value < target) {
      ptr = ptr.right;
    } else if (ptr.value > target) {
      ptr = ptr.left;
    }
  }

  // Not Found
  return false;
}
`;

const search: TExecutionFunction = async (board, args, animate) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;

  const target = args.target as number;

  if (animate) {
    await _searchAnimated(board, tree, target);
  }
};

async function _searchAnimated(
  board: Board,
  tree: BinarySearchTree,
  target: number
) {
  board.setCode(codeKey, code);
  board.pushStack(`search(tree,target=${target})`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (tree.root === null) {
    board.pushStep(codeKey, [4]);

    board.doneLastCall();
    board.pushStep(codeKey, [22]);
    // Not Found
    return false;
  }

  let ptr: BinarySearchTreeNode | null = tree.root;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [7]);

  board.pushStep(codeKey, [9]);
  while (ptr !== null) {
    if (ptr.value === target) {
      board.pushStep(codeKey, [10]);

      ptr.color = Color.green;
      board.pushStep(codeKey, [12]);

      ptr.color = Color.transparent;
      board.doneLastCall();
      board.pushStep(codeKey, [22]);
      // Found
      return true;
    } else if (ptr.value < target) {
      board.pushStep(codeKey, [10]);
      board.pushStep(codeKey, [13]);
      ptr.color = Color.transparent;
      ptr = ptr.right;
      if (ptr !== null) {
        ptr.color = Color.grey;
      }
      board.pushStep(codeKey, [14]);
    } else if (ptr.value > target) {
      board.pushStep(codeKey, [10]);
      board.pushStep(codeKey, [13]);
      board.pushStep(codeKey, [15]);
      ptr.color = Color.transparent;
      ptr = ptr.left;
      if (ptr !== null) {
        ptr.color = Color.grey;
      }
      board.pushStep(codeKey, [16]);
    }

    board.pushStep(codeKey, [9]);
  }

  board.pushStep(codeKey, [21]);

  board.doneLastCall();
  board.pushStep(codeKey, [22]);
  // Not Found
  return false;
}

export default search;
