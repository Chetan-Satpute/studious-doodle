import LinkedList, {LinkedListNode} from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'LINKED_LIST_REMOVE';

const code = `
function remove(list, position) {
  if (list.head === null) {
    return;
  }

  if (position <= 0) {
    const node = list.head;

    list.head = list.head.right;

    if (list.head !== null) {
      list.head.left = null;
    }

    node.right = null;

    return;
  }

  let ptr = list.head;

  for (let i = 1; i < position; i++) {
    if (ptr.right === null) {
      break;
    }

    ptr = ptr.right;
  }

  if (ptr.right === null) {
    return;
  }

  const node = ptr.right;

  node.left = null;
  ptr.right = node.right;

  if (ptr.right !== null) {
    ptr.right.left = ptr;
  }

  node.right = null;
}
`;

const remove: TExecutionFunction = async (board, args, animate) => {
  const list = board.getPrimaryStructure() as LinkedList;

  const position = args.position as number;

  if (animate) {
    await _removeAnimated(board, list, position);
  } else {
    await _remove(board, list, position);
  }
};

async function _remove(board: Board, list: LinkedList, position: number) {
  if (list.head === null) {
    return;
  }

  if (position <= 0) {
    list.head = list.head.right;

    list.rearrange();
    return;
  }

  let ptr = list.head;
  for (let i = 1; i < position; i++) {
    if (ptr.right === null) {
      break;
    }

    ptr = ptr.right;
  }

  if (ptr.right === null) {
    return;
  }

  const node = ptr.right;

  node.left = null;
  ptr.right = node.right;

  if (node.right !== null) {
    node.right.left = ptr;
  }

  node.right = null;

  list.rearrange();
}

async function _removeAnimated(
  board: Board,
  list: LinkedList,
  position: number
) {
  board.setCode(codeKey, code);
  board.pushStack(`remove(list,position=${position})`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (list.head === null) {
    board.doneLastCall();
    board.pushStep(codeKey, [3]);
    return;
  }

  board.pushStep(codeKey, [6]);
  if (position <= 0) {
    const node = list.head;
    node.color = Color.grey;
    board.pushStep(codeKey, [7]);

    list.head = list.head.right;
    list.moveTo(list.x + LinkedListNode.WIDTH * 2, list.y);
    list.rearrange();
    board.add(node);
    board.pushStep(codeKey, [9]);

    board.pushStep(codeKey, [11]);
    if (list.head !== null) {
      list.head.shrinkLeftEdge(board);
      list.head.left = null;
      board.pushStep(codeKey, [12]);
    }

    node.shrinkRightEdge(board);
    node.right = null;
    board.pushStep(codeKey, [15]);

    board.remove(node);
    list.animatedMoveTo(board, list.x - LinkedListNode.WIDTH * 2, list.y);
    board.pushStep(codeKey, [17]);

    board.doneLastCall();
    board.pushStep(codeKey, [43]);
    return;
  }

  let ptr = list.head;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [20]);

  board.pushStep(codeKey, [22]);
  for (let i = 1; i < position; i++) {
    board.pushStep(codeKey, [23]);
    if (ptr.right === null) {
      board.pushStep(codeKey, [24]);
      break;
    }

    ptr.color = Color.transparent;
    ptr = ptr.right;
    ptr.color = Color.grey;
    board.pushStep(codeKey, [27]);

    board.pushStep(codeKey, [22]);
  }

  board.pushStep(codeKey, [30]);
  if (ptr.right === null) {
    ptr.color = Color.transparent;
    board.pushStep(codeKey, [31]);

    board.doneLastCall();
    board.pushStep(codeKey, [44]);
    return;
  }

  const node = ptr.right;
  node.color = Color.red;
  node.animatedMoveTo(board, node.x, node.y + LinkedListNode.HEIGHT * 2);
  board.pushStep(codeKey, [34]);

  node.shrinkLeftEdge(board);
  node.left = null;
  board.pushStep(codeKey, [36]);

  ptr.shrinkRightEdge(board);
  ptr.right = node.right;
  board.add(node);
  if (ptr.right !== null) {
    ptr.growRightEdge(board);
  }
  board.pushStep(codeKey, [37]);

  board.pushStep(codeKey, [39]);
  if (ptr.right !== null) {
    ptr.right.shrinkLeftEdge(board);
    ptr.right.left = ptr;
    ptr.right.growLeftEdge(board);
    board.pushStep(codeKey, [40]);
  }

  if (node.right !== null) {
    node.shrinkRightEdge(board);
  }
  node.right = null;
  board.remove(node);

  if (ptr.right !== null) {
    ptr.right.animatedMoveTo(board, ptr.x + LinkedListNode.WIDTH * 2, ptr.y);
  }
  board.pushStep(codeKey, [43]);

  ptr.color = Color.transparent;
  list.rearrange();
  board.doneLastCall();
  board.pushStep(codeKey, [44]);
}

export default remove;
