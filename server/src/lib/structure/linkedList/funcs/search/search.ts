import LinkedList, {LinkedListNode} from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'LINKED_LIST_INSERT';

const code = `
function search(list, target) {
  if (list.head === null) {
    // Not Found
    return false;
  }

  let ptr = list.head;

  while (ptr !== null) {
    if (ptr.value === target) {
      // Found
      return true;
    }

    ptr = ptr.right;
  }

  // Not Found
  return false;
}
`;

const search: TExecutionFunction = async (board, args, animate) => {
  const list = board.getPrimaryStructure() as LinkedList;

  const target = args.target as number;

  if (animate) {
    await _searchAnimated(board, list, target);
  }
};

async function _searchAnimated(board: Board, list: LinkedList, target: number) {
  board.setCode(codeKey, code);
  board.pushStack(`search(list,target=${target})`);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (list.head === null) {
    board.pushStep(codeKey, [4]);

    board.doneLastCall();
    board.pushStep(codeKey, [20]);
    // Not Found
    return false;
  }

  let ptr: LinkedListNode | null = list.head;
  ptr.color = Color.grey;
  board.pushStep(codeKey, [7]);

  board.pushStep(codeKey, [9]);
  while (ptr !== null) {
    board.pushStep(codeKey, [10]);
    if (ptr.value === target) {
      ptr.color = Color.green;
      board.pushStep(codeKey, [12]);

      ptr.color = Color.transparent;
      board.doneLastCall();
      board.pushStep(codeKey, [20]);
      // Found
      return true;
    }

    ptr.color = Color.transparent;
    ptr = ptr.right;
    if (ptr !== null) {
      ptr.color = Color.grey;
    }
    board.pushStep(codeKey, [15]);
    board.pushStep(codeKey, [9]);
  }

  board.pushStep(codeKey, [19]);
  board.doneLastCall();
  board.pushStep(codeKey, [20]);
  // Not Found
  return false;
}

export default search;
