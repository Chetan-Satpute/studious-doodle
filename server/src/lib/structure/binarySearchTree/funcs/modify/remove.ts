import BinarySearchTree, {BinarySearchTreeNode} from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'BINARY_SEARCH_TREE_REMOVE';

const code = `
function remove(tree, value) {
  if (tree === null) {
    return null;
  }

  let [node, parent] = searchNode(tree, value);

  if (node === null) {
    return;
  }

  if (node.left === null && node.right === null) {
    if (parent === null) {
      tree.root = null;
    } else {
      parent.left === node && (parent.left = null);
      parent.right === node && (parent.right = null);
    }

    return;
  }

  if (node.left === null) {
    if (parent === null) {
      tree.root = node.right;
    } else {
      parent.left === node && (parent.left = node.right);
      parent.right === node && (parent.right = node.right);
    }

    node.right = null;

    return;
  }

  if (node.right === null) {
    if (parent === null) {
      tree.root = node.left;
    } else {
      parent.left === node && (parent.left = node.left);
      parent.right === node && (parent.right = node.left);
    }

    node.left = null;

    return;
  }

  let successor = getSuccessor(node);

  remove(tree, successor.value);

  successor.left = node.left;
  successor.right = node.right;

  if (parent === null) {
    tree.root = node;
  } else {
    parent.left === node && (parent.left = successor);
    parent.right === node && (parent.right = successor);
  }

  return;
}

function searchNode(tree, target) {
  if (tree.root === null) {
    return null;
  }

  let parent = null;
  let ptr = tree.root;

  while (ptr !== null) {
    if (ptr.value === target) {
      return [ptr, parent];
    } else if (ptr.value < target) {
      parent = ptr;
      ptr = ptr.right;
    } else if (ptr.value > target) {
      parent = ptr;
      ptr = ptr.left;
    }
  }

  return [null, null];
}

function getSuccessor(node) {
  if (node === null) {
    return null;
  }

  if (node.right === null) {
    return null;
  }

  let ptr = node.right;

  while (ptr.left !== null) {
    ptr = ptr.left;
  }

  return ptr;
}
`;

const remove: TExecutionFunction = async (board, args, animate) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;

  const value = args.value as number;

  if (animate) {
    board.setCode(codeKey, code);
    await _removeAnimated(board, tree, value, false);
  } else {
    await _remove(board, tree, value);
  }
};

async function _remove(board: Board, tree: BinarySearchTree, value: number) {
  if (tree.root === null) {
    return;
  }

  if (tree.root.value === value) {
    if (tree.root.right === null) {
      tree.root = tree.root.left;
    } else {
      let parent = tree.root;
      let node = tree.root.right;

      while (node.left !== null) {
        parent = node;
        node = node.left;
      }

      if (parent !== tree.root) {
        parent.left = node.right;
      }

      node.left = tree.root.left;

      if (parent !== tree.root) {
        node.right = tree.root.right;
      }

      tree.root = node;
    }

    tree.rearrange();
    return;
  }

  let parent: BinarySearchTreeNode | null = tree.root;
  let node: BinarySearchTreeNode | null = tree.root;

  while (node !== null) {
    if (node.value === value) {
      break;
    } else if (node.value < value) {
      parent = node;
      node = node.right;
    } else if (node.value > value) {
      parent = node;
      node = node.left;
    }
  }

  if (node === null) {
    return;
  }

  if (node.right === null) {
    if (parent.value < value) {
      parent.right = node.left;
    } else if (parent.value > value) {
      parent.left = node.left;
    }
  } else {
    let replaceNodeParent: BinarySearchTreeNode | null = node;
    let replaceNode: BinarySearchTreeNode | null = node.right;

    while (replaceNode.left !== null) {
      replaceNodeParent = replaceNode;
      replaceNode = replaceNode.left;
    }

    if (replaceNodeParent !== node) {
      replaceNodeParent.left = replaceNode.right;
    }

    replaceNode.left = node.left;

    if (replaceNodeParent !== node) {
      replaceNode.right = node.right;
    }

    if (parent.value < value) {
      parent.right = replaceNode;
    } else if (parent.value > value) {
      parent.left = replaceNode;
    }
  }

  tree.rearrange();
}

async function _removeAnimated(
  board: Board,
  tree: BinarySearchTree,
  value: number,
  keepNode: boolean
) {
  board.pushStack(`remove(tree,value=${value}`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (tree === null) {
    board.pushStep(codeKey, [3]);

    board.doneLastCall();
    board.pushStep(codeKey, [64]);
    return null;
  }

  board.pushStep(codeKey, [6]);
  const [node, parent] = await _searchNode(board, tree, value);
  board.popStack();
  if (node) node.color = Color.red;
  board.pushStep(codeKey, [6]);

  board.pushStep(codeKey, [8]);
  if (node === null) {
    board.pushStep(codeKey, [9]);

    board.doneLastCall();
    board.pushStep(codeKey, [64]);
    return;
  }

  board.pushStep(codeKey, [12]);
  if (node.left === null && node.right === null) {
    board.pushStep(codeKey, [13]);
    if (parent === null) {
      tree.root = null;
      board.pushStep(codeKey, [14]);
    } else {
      node.animatedMoveTo(
        board,
        node.x,
        tree.y - BinarySearchTreeNode.HEIGHT * 2
      );
      if (parent.left === node) {
        parent.shrinkLeftEdge(board);
        parent.left = null;
        if (keepNode) board.add(node);
      } else if (parent.right === node) {
        parent.shrinkRightEdge(board);
        parent.right = null;
        if (keepNode) board.add(node);
      }
      board.pushStep(codeKey, [16, 17]);
    }

    tree.animatedRearrange(board);
    board.pushStep(codeKey, [20]);

    board.doneLastCall();
    board.pushStep(codeKey, [64]);
    return;
  }

  board.pushStep(codeKey, [23]);
  if (node.left === null) {
    board.pushStep(codeKey, [24]);
    if (parent === null) {
      tree.root = node.right;
      if (keepNode) board.add(node);
      board.pushStep(codeKey, [25]);
    } else {
      node.animatedMoveTo(
        board,
        node.x,
        tree.y - BinarySearchTreeNode.HEIGHT * 2
      );
      if (parent.left === node) {
        parent.shrinkLeftEdge(board);
        parent.left = node.right;
        board.add(node);
        if (parent.left) parent.growLeftEdge(board);
      } else if (parent.right === node) {
        parent.shrinkRightEdge(board);
        parent.right = node.right;
        board.add(node);
        if (parent.right) parent.growRightEdge(board);
      }
      board.pushStep(codeKey, [27, 28]);
    }

    node.shrinkRightEdge(board);
    node.right = null;
    board.pushStep(codeKey, [31]);

    if (!keepNode) board.remove(node);
    tree.animatedRearrange(board);
    board.pushStep(codeKey, [33]);

    board.doneLastCall();
    board.pushStep(codeKey, [64]);
    return;
  }

  board.pushStep(codeKey, [36]);
  if (node.right === null) {
    board.pushStep(codeKey, [37]);
    if (parent === null) {
      tree.root = node.left;
      if (keepNode) board.add(node);
      board.pushStep(codeKey, [38]);
    } else {
      node.animatedMoveTo(
        board,
        node.x,
        tree.y - BinarySearchTreeNode.HEIGHT * 2
      );
      if (parent.left === node) {
        parent.shrinkLeftEdge(board);
        parent.left = node.left;
        board.add(node);
        if (parent.left) parent.growLeftEdge(board);
      } else if (parent.right === node) {
        parent.shrinkRightEdge(board);
        parent.right = node.left;
        board.add(node);
        if (parent.right) parent.growRightEdge(board);
      }
      if (keepNode) board.add(node);
      board.pushStep(codeKey, [40, 41]);
    }

    node.shrinkLeftEdge(board);
    node.left = null;
    board.pushStep(codeKey, [44]);

    if (!keepNode) board.remove(node);
    tree.animatedRearrange(board);
    board.pushStep(codeKey, [46]);

    board.doneLastCall();
    board.pushStep(codeKey, [64]);
    return;
  }

  board.pushStep(codeKey, [49]);
  const successor = await _getSuccessor(board, node);
  if (successor) successor.color = Color.slateBlue;
  board.popStack();
  board.pushStep(codeKey, [49]);

  if (successor === null) return;

  board.pushStep(codeKey, [51]);
  await _removeAnimated(board, tree, successor.value, true);
  board.popStack();
  node.color = Color.red;
  successor.color = Color.slateBlue;
  const nodeY = node.y;
  node.animatedMoveTo(board, node.x, tree.y - BinarySearchTreeNode.HEIGHT * 2);
  successor.animatedMoveTo(board, node.x, nodeY);
  board.pushStep(codeKey, [51]);

  if (successor.left) successor.shrinkLeftEdge(board);
  successor.left = node.left;
  if (successor.left) successor.growLeftEdge(board);
  board.pushStep(codeKey, [53]);

  if (successor.right) successor.shrinkRightEdge(board);
  successor.right = node.right;
  if (successor.right) successor.growRightEdge(board);
  board.pushStep(codeKey, [54]);

  board.pushStep(codeKey, [56]);
  if (parent === null) {
    tree.root = successor;
    board.pushStep(codeKey, [57]);
  } else {
    if (parent.left === node) {
      parent.shrinkLeftEdge(board);
      parent.left = successor;
      if (parent.left) parent.growLeftEdge(board);
    } else if (parent.right === node) {
      parent.shrinkRightEdge(board);
      parent.right = successor;
      if (parent.right) parent.growRightEdge(board);
    }
    board.pushStep(codeKey, [59, 60]);
  }

  successor.color = Color.transparent;
  tree.animatedRearrange(board);
  board.pushStep(codeKey, [63]);

  board.doneLastCall();
  board.pushStep(codeKey, [64]);
  return;
}

async function _searchNode(
  board: Board,
  tree: BinarySearchTree,
  target: number
): Promise<[BinarySearchTreeNode | null, BinarySearchTreeNode | null]> {
  board.pushStack(`searchNode(tree,target=${target}`);
  board.pushStep(codeKey, [66]);

  board.pushStep(codeKey, [67]);
  if (tree.root === null) {
    board.pushStep(codeKey, [68]);

    board.doneLastCall();
    board.pushStep(codeKey, [87]);
    return [null, null];
  }

  let parent: BinarySearchTreeNode | null = null;
  board.pushStep(codeKey, [71]);

  let ptr: BinarySearchTreeNode | null = tree.root;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [72]);

  board.pushStep(codeKey, [74]);
  while (ptr !== null) {
    if (ptr.value === target) {
      board.pushStep(codeKey, [75]);

      ptr.color = Color.slateBlue;
      board.pushStep(codeKey, [76]);

      ptr.color = Color.transparent;
      board.doneLastCall();
      board.pushStep(codeKey, [87]);
      return [ptr, parent];
    } else if (ptr.value < target) {
      board.pushStep(codeKey, [75]);
      board.pushStep(codeKey, [77]);

      parent = ptr;
      board.pushStep(codeKey, [78]);
      ptr.color = Color.transparent;
      ptr = ptr.right;
      if (ptr) ptr.color = Color.grey;
      board.pushStep(codeKey, [79]);
    } else if (ptr.value > target) {
      board.pushStep(codeKey, [75]);
      board.pushStep(codeKey, [77]);
      board.pushStep(codeKey, [80]);

      parent = ptr;
      board.pushStep(codeKey, [81]);
      ptr.color = Color.transparent;
      ptr = ptr.left;
      if (ptr) ptr.color = Color.grey;
      board.pushStep(codeKey, [82]);
    }

    board.pushStep(codeKey, [74]);
  }

  board.pushStep(codeKey, [86]);

  board.doneLastCall();
  board.pushStep(codeKey, [87]);
  return [null, null];
}

async function _getSuccessor(board: Board, node: BinarySearchTreeNode | null) {
  board.pushStack(
    `getSuccessor(node=${node === null ? 'null' : 'Node(' + node.value + ')'})`
  );
  board.pushStep(codeKey, [89]);

  board.pushStep(codeKey, [90]);
  if (node === null) {
    board.pushStep(codeKey, [91]);

    board.doneLastCall();
    board.pushStep(codeKey, [105]);
    return null;
  }

  board.pushStep(codeKey, [94]);
  if (node.right === null) {
    board.pushStep(codeKey, [95]);

    board.doneLastCall();
    board.pushStep(codeKey, [105]);
    return null;
  }

  let ptr = node.right;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [98]);

  board.pushStep(codeKey, [100]);
  while (ptr.left !== null) {
    ptr.color = Color.transparent;
    ptr = ptr.left;
    if (ptr) ptr.color = Color.grey;
    board.pushStep(codeKey, [101]);

    board.pushStep(codeKey, [100]);
  }

  board.pushStep(codeKey, [104]);

  board.doneLastCall();
  board.pushStep(codeKey, [105]);
  return ptr;
}

export default remove;
