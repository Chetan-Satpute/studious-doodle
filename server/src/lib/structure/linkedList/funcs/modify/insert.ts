import LinkedList, {LinkedListNode} from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'LINKED_LIST_INSERT';

const code = `
function insert(list, position, value) {
  if (list.head === null) {
    list.head = new LinkedListNode(value);

    return;
  }

  if (position <= 0) {
    const node = new LinkedListNode(value);

    node.right = list.head;
    list.head.left = node;
    list.head = node;

    return;
  }

  let ptr = list.head;
  for (let i = 1; i < position; i++) {
    if (ptr.right === null) {
      break;
    }

    ptr = ptr.right;
  }

  const node = new LinkedListNode(value);

  node.right = ptr.right;

  if (ptr.right !== null) {
    ptr.right.left = node;
  }

  ptr.right = node;
  node.left = ptr;
}
`;

const insert: TExecutionFunction = async (board, args, animate) => {
  const list = board.getPrimaryStructure() as LinkedList;

  const position = args.position as number;
  const value = args.value as number;

  if (animate) {
    await _insertAnimated(board, list, position, value);
  } else {
    await _insert(board, list, position, value);
  }
};

async function _insert(
  board: Board,
  list: LinkedList,
  position: number,
  value: number
) {
  if (list.head === null) {
    const node = new LinkedListNode(value);
    list.head = node;

    list.rearrange();
    return;
  }

  if (position <= 0) {
    const node = new LinkedListNode(value);

    node.right = list.head;
    list.head.left = node;
    list.head = node;

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

  const node = new LinkedListNode(value);

  node.right = ptr.right;

  if (ptr.right !== null) {
    ptr.right.left = node;
  }

  ptr.right = node;
  node.left = ptr;

  list.rearrange();
}

async function _insertAnimated(
  board: Board,
  list: LinkedList,
  position: number,
  value: number
) {
  board.setCode(codeKey, code);
  board.pushStack(`insert(list,position=${position},value=${value})`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (list.head === null) {
    list.head = new LinkedListNode(value);
    list.rearrange();

    board.pushStep(codeKey, [3]);
    board.pushStep(codeKey, [5]);

    board.doneLastCall();
    board.pushStep(codeKey, [37]);
    return;
  }

  board.pushStep(codeKey, [8]);
  if (position <= 0) {
    list.animatedMoveTo(board, list.x + (LinkedListNode.WIDTH * 3) / 2, list.y);

    const node = new LinkedListNode(value);
    node.moveTo(list.x - LinkedListNode.WIDTH * 2, list.y);

    board.add(node);
    board.pushStep(codeKey, [9]);

    node.right = list.head;

    node.leftEdgePercent = 0;
    node.growRightEdge(board);
    board.pushStep(codeKey, [11]);

    list.head.left = node;
    list.head.growLeftEdge(board);
    board.pushStep(codeKey, [12]);

    board.remove(node);

    list.head = node;
    list.moveTo(list.x - LinkedListNode.WIDTH * 2, list.y);
    list.rearrange();
    board.pushStep(codeKey, [13]);

    board.pushStep(codeKey, [15]);

    board.doneLastCall();
    board.pushStep(codeKey, [37]);
    return;
  }

  let ptr = list.head;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [18]);
  board.pushStep(codeKey, [19]);
  for (let i = 1; i < position; i++) {
    board.pushStep(codeKey, [20]);
    if (ptr.right === null) {
      board.pushStep(codeKey, [21]);
      break;
    }

    ptr.color = Color.transparent;
    ptr = ptr.right;
    ptr.color = Color.grey;
    board.pushStep(codeKey, [24]);
    board.pushStep(codeKey, [19]);
  }

  // move all nodes from ptr to end to the right
  const nodes: LinkedListNode[] = [];
  let p = ptr.right;
  while (p !== null) {
    nodes.push(p);
    p = p.right;
  }

  if (nodes.length) {
    for (let i = 0; i < LinkedListNode.WIDTH * 2; i++) {
      for (let j = 0; j < nodes.length; j++) {
        nodes[j].x += 1;
      }

      board.pushFrame();
    }
  }
  // end

  const node = new LinkedListNode(value);
  node.moveTo(
    ptr.x + LinkedListNode.WIDTH * 2,
    ptr.y + LinkedListNode.HEIGHT * 2
  );
  board.add(node);
  board.pushStep(codeKey, [27]);

  node.right = ptr.right;
  if (ptr.right !== null) {
    node.leftEdgePercent = 0;
    node.growRightEdge(board);
  }
  board.pushStep(codeKey, [29]);

  board.pushStep(codeKey, [31]);
  if (ptr.right !== null) {
    ptr.right.shrinkLeftEdge(board);
    ptr.right.left = node;
    ptr.right.growLeftEdge(board);
    board.pushStep(codeKey, [32]);

    ptr.shrinkRightEdge(board);
  }

  node.animatedMoveTo(board, node.x, node.y - LinkedListNode.HEIGHT * 2);
  ptr.right = node;
  board.remove(node);
  ptr.growRightEdge(board);
  board.pushStep(codeKey, [35]);

  node.left = ptr;
  node.growLeftEdge(board);
  board.pushStep(codeKey, [36]);

  list.rearrange();

  ptr.color = Color.transparent;
  board.doneLastCall();
  board.pushStep(codeKey, [37]);
}

export default insert;
