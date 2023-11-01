import BinarySearchTree, {BinarySearchTreeNode} from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'BINARY_SEARCH_TREE_REMOVE';

const code = `
function remove(tree, value) {
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

    return;
  }

  let parent = tree.root;
  let node = tree.root;

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
    let replaceNodeParent = node;
    let replaceNode = node.right;

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
}
`;

const remove: TExecutionFunction = async (board, args, animate) => {
  const tree = board.getPrimaryStructure() as BinarySearchTree;

  const value = args.value as number;

  if (animate) {
    await _removeAnimated(board, tree, value);
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
  value: number
) {
  board.setCode(codeKey, code);
  board.pushStack(`remove(tree,value=${value})`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (tree.root === null) {
    board.pushStep(codeKey, [3]);

    board.doneLastCall();
    board.pushStep(codeKey, [84]);
    return;
  }

  board.pushStep(codeKey, [6]);
  if (tree.root.value === value) {
    board.pushStep(codeKey, [7]);
    if (tree.root.right === null) {
      tree.root = tree.root.left;
      board.pushStep(codeKey, [8]);
    } else {
      let parent = tree.root;
      board.pushStep(codeKey, [10]);
      let node = tree.root.right;
      board.pushStep(codeKey, [11]);

      board.pushStep(codeKey, [13]);
      while (node.left !== null) {
        parent = node;
        board.pushStep(codeKey, [14]);
        node = node.left;
        board.pushStep(codeKey, [15]);
        board.pushStep(codeKey, [13]);
      }

      board.pushStep(codeKey, [18]);
      if (parent !== tree.root) {
        parent.left = node.right;
        board.pushStep(codeKey, [19]);
      }

      node.left = tree.root.left;
      board.pushStep(codeKey, [22]);

      board.pushStep(codeKey, [24]);
      if (parent !== tree.root) {
        node.right = tree.root.right;
        board.pushStep(codeKey, [25]);
      }

      tree.root = node;
      board.pushStep(codeKey, [28]);
    }

    tree.rearrange();
    board.pushStep(codeKey, [31]);

    board.doneLastCall();
    board.pushStep(codeKey, [84]);
    return;
  }

  let parent: BinarySearchTreeNode | null = tree.root;
  board.pushStep(codeKey, [34]);
  let node: BinarySearchTreeNode | null = tree.root;
  board.pushStep(codeKey, [35]);

  board.pushStep(codeKey, [37]);
  while (node !== null) {
    board.pushStep(codeKey, [38]);
    if (node.value === value) {
      board.pushStep(codeKey, [39]);
      break;
    } else if (node.value < value) {
      board.pushStep(codeKey, [40]);
      parent = node;
      board.pushStep(codeKey, [41]);
      node = node.right;
      board.pushStep(codeKey, [42]);
    } else if (node.value > value) {
      board.pushStep(codeKey, [40]);
      board.pushStep(codeKey, [43]);
      parent = node;
      board.pushStep(codeKey, [44]);
      node = node.left;
      board.pushStep(codeKey, [45]);
    }

    board.pushStep(codeKey, [37]);
  }

  board.pushStep(codeKey, [49]);
  if (node === null) {
    board.pushStep(codeKey, [50]);

    board.doneLastCall();
    board.pushStep(codeKey, [84]);
    return;
  }

  board.pushStep(codeKey, [53]);
  if (node.right === null) {
    board.pushStep(codeKey, [54]);
    if (parent.value < value) {
      parent.right = node.left;
      board.pushStep(codeKey, [55]);
    } else if (parent.value > value) {
      board.pushStep(codeKey, [54]);
      board.pushStep(codeKey, [56]);
      parent.left = node.left;
      board.pushStep(codeKey, [57]);
    }
  } else {
    let replaceNodeParent: BinarySearchTreeNode | null = node;
    board.pushStep(codeKey, [60]);
    let replaceNode: BinarySearchTreeNode | null = node.right;
    board.pushStep(codeKey, [61]);

    board.pushStep(codeKey, [63]);
    while (replaceNode.left !== null) {
      replaceNodeParent = replaceNode;
      board.pushStep(codeKey, [64]);
      replaceNode = replaceNode.left;
      board.pushStep(codeKey, [65]);

      board.pushStep(codeKey, [63]);
    }

    board.pushStep(codeKey, [68]);
    if (replaceNodeParent !== node) {
      replaceNodeParent.left = replaceNode.right;
      board.pushStep(codeKey, [69]);
    }

    replaceNode.left = node.left;
    board.pushStep(codeKey, [72]);

    board.pushStep(codeKey, [74]);
    if (replaceNodeParent !== node) {
      replaceNode.right = node.right;
      board.pushStep(codeKey, [75]);
    }

    board.pushStep(codeKey, [78]);
    if (parent.value < value) {
      parent.right = replaceNode;
      board.pushStep(codeKey, [79]);
    } else if (parent.value > value) {
      board.pushStep(codeKey, [80]);
      parent.left = replaceNode;
      board.pushStep(codeKey, [81]);
    }
  }

  tree.rearrange();

  board.doneLastCall();
  board.pushStep(codeKey, [84]);
}

export default remove;
