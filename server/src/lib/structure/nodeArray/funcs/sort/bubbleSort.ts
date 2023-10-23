import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_BUBBLE_SORT';

const code = `
function bubbleSort(array) {
  for (let i = array.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (array[j + 1] < array[j]) {
        // swap array[j] and array[j + 1]
        [array[j + 1], array[j]] = [array[j], array[j + 1]];
      }
    }
  }
}
`;

export const bubbleSort: TExecutionFunction = async (board, _args, animate) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (animate) {
    await _bubbleSortAnimated(board, array);
  }
};

async function _bubbleSortAnimated(board: Board, array: NodeArray) {
  board.pushStack('bubbleSort(array)');
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  for (let i = array.array.length - 1; i >= 0; i--) {
    board.pushStep(codeKey, [3]);
    for (let j = 0; j < i; j++) {
      array.array[j].color = Color.grey;
      array.array[j + 1].color = Color.grey;
      board.pushStep(codeKey, [4]);
      if (array.array[j + 1].value < array.array[j].value) {
        // swap array.array[j] and array.array[j + 1]
        [array.array[j + 1], array.array[j]] = [
          array.array[j],
          array.array[j + 1],
        ];
        array.rearrange();
        board.pushStep(codeKey, [6]);
      }

      array.array[j].color = Color.transparent;
      array.array[j + 1].color = Color.transparent;
      board.pushStep(codeKey, [3]);
    }

    array.array[i].color = Color.green;
    board.pushStep(codeKey, [2]);
  }

  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.transparent;
  }

  board.doneLastCall();
  board.pushStep(codeKey, [10]);

  return array;
}
