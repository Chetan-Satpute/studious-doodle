import BinarySearchTree, {BinarySearchTreeNode} from '../..';
import Structure from '../../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'BINARY_SEARCH_TREE_INSERT';

const code = `
function insert(tree, value) {
  const node = new BinarySearchTreeNode(value);

  if (tree.root === null) {
    tree.root = node;
    return;
  }

  let ptr = tree.root;

  while (ptr !== null) {
    if (ptr.value === value) {
      return;
    } else if (ptr.value < value) {
      if (ptr.right === null) {
        ptr.right = node;
        return;
      } else {
        ptr = ptr.right;
      }
    } else if (ptr.value > value) {
      if (ptr.left === null) {
        ptr.left = node;
        return;
      } else {
        ptr = ptr.left;
      }
    }
  }

  return;
}
`;

const insert: TExecutionFunction = async (board, args, animate) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;

  const value = args.value as number;

  if (animate) {
    await _insertAnimated(board, tree, value);
  } else {
    await _insert(board, tree, value);
  }
};

async function _insert(board: Board, tree: BinarySearchTree, value: number) {
  const node = new BinarySearchTreeNode(value);

  if (tree.root === null) {
    tree.root = node;
    tree.rearrange();
    return;
  }

  let ptr = tree.root;

  while (ptr !== null) {
    if (ptr.value === value) {
      return;
    } else if (ptr.value < value) {
      if (ptr.right === null) {
        ptr.right = node;
        tree.rearrange();
        return;
      } else {
        ptr = ptr.right;
      }
    } else if (ptr.value > value) {
      if (ptr.left === null) {
        ptr.left = node;
        tree.rearrange();
        return;
      } else {
        ptr = ptr.left;
      }
    }
  }

  tree.rearrange();

  return;
}

async function _insertAnimated(
  board: Board,
  tree: BinarySearchTree,
  value: number
) {
  board.setCode(codeKey, code);
  board.pushStack(`insert(tree,value=${value})`);
  board.pushStep(codeKey, [1]);

  const node = new BinarySearchTreeNode(value);
  node.color = Color.slateBlue;
  board.pushStep(codeKey, [2]);

  board.pushStep(codeKey, [4]);
  if (tree.root === null) {
    tree.root = node;
    tree.rearrange();
    board.pushStep(codeKey, [5]);

    node.color = Color.transparent;
    board.doneLastCall();
    board.pushStep(codeKey, [32]);
    return;
  }

  let ptr = tree.root;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [9]);

  board.pushStep(codeKey, [11]);
  while (ptr !== null) {
    if (ptr.value === value) {
      board.pushStep(codeKey, [12]);

      ptr.color = Color.transparent;
      board.pushStep(codeKey, [13]);

      node.color = Color.transparent;
      board.doneLastCall();
      board.pushStep(codeKey, [32]);
      return;
    } else if (ptr.value < value) {
      board.pushStep(codeKey, [12]);
      board.pushStep(codeKey, [14]);

      board.pushStep(codeKey, [15]);
      if (ptr.right === null) {
        const nodes = tree.allNodesAfter(ptr);
        if (nodes.length !== 0) {
          Structure.animatedMoveAll(
            board,
            BinarySearchTreeNode.WIDTH,
            0,
            nodes
          );
        }

        ptr.right = node;
        tree.rearrange();

        ptr.growRightEdge(board);
        board.pushStep(codeKey, [16]);

        ptr.color = Color.transparent;
        board.pushStep(codeKey, [17]);

        node.color = Color.transparent;
        board.doneLastCall();
        board.pushStep(codeKey, [32]);
        return;
      } else {
        board.pushStep(codeKey, [18]);

        ptr.color = Color.transparent;
        ptr = ptr.right;
        ptr.color = Color.grey;
        board.pushStep(codeKey, [19]);
      }
    } else if (ptr.value > value) {
      board.pushStep(codeKey, [12]);
      board.pushStep(codeKey, [14]);
      board.pushStep(codeKey, [21]);

      board.pushStep(codeKey, [22]);
      if (ptr.left === null) {
        const nodes = tree.allNodesAfter(ptr);
        nodes.push(ptr);

        Structure.animatedMoveAll(board, BinarySearchTreeNode.WIDTH, 0, nodes);

        ptr.left = node;
        tree.rearrange();

        ptr.growLeftEdge(board);
        board.pushStep(codeKey, [23]);

        ptr.color = Color.transparent;
        board.pushStep(codeKey, [24]);

        node.color = Color.transparent;
        board.doneLastCall();
        board.pushStep(codeKey, [32]);
        return;
      } else {
        board.pushStep(codeKey, [25]);

        ptr.color = Color.transparent;
        ptr = ptr.left;
        ptr.color = Color.grey;
        board.pushStep(codeKey, [26]);
      }
    }

    board.pushStep(codeKey, [11]);
  }

  node.color = Color.transparent;
  board.doneLastCall();
  board.pushStep(codeKey, [32]);
  return;
}

export default insert;
