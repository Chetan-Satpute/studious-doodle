import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_BINARY_SEARCH';
const code = `
function binarySearch(array, target) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = left + (right - left) / 2;

    if (array[mid] === target) {
      return mid;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else if (array[mid] > target) {
      right = mid;
    }
  }

  return array.length;
}
`;

export const binarySearch: TExecutionFunction = async (
  board,
  args,
  animated
) => {
  const array = board.getPrimaryStructure() as NodeArray;
  const target = args.target as number;

  if (animated) {
    await _binarySearchAnimated(board, array, target);
  }
};

async function _binarySearchAnimated(
  board: Board,
  array: NodeArray,
  target: number
) {
  board.pushStack(`binarySearch(array=${array.toString()}, target=${target})`);
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  let left = 0;
  board.pushStep(codeKey, [2]);

  let right = array.array.length;
  board.pushStep(codeKey, [3]);

  board.pushStep(codeKey, [5]);
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    console.log(left, right, mid);
    array.array[mid].color = Color.grey;
    board.pushStep(codeKey, [6]);

    if (array.array[mid].value === target) {
      board.pushStep(codeKey, [8]);

      array.array[mid].color = Color.green;
      board.pushStep(codeKey, [9]);

      for (let i = 0; i < array.array.length; i++) {
        array.array[i].color = Color.transparent;
      }
      board.doneLastCall();
      board.pushStep(codeKey, [18]);
      return mid;
    } else if (array.array[mid].value < target) {
      board.pushStep(codeKey, [8]);

      board.pushStep(codeKey, [10]);

      for (let i = left; i <= mid; i++) {
        array.array[i].color = Color.red;
      }
      board.pushStep(codeKey, [11]);
      left = mid + 1;
    } else if (array.array[mid].value > target) {
      board.pushStep(codeKey, [8]);

      board.pushStep(codeKey, [10]);

      board.pushStep(codeKey, [12]);

      for (let i = mid; i < right; i++) {
        array.array[i].color = Color.red;
      }
      board.pushStep(codeKey, [13]);
      right = mid;
    }
  }

  board.pushStep(codeKey, [17]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.transparent;
  }

  board.doneLastCall();
  board.pushStep(codeKey, [18]);

  return array.array.length;
}
