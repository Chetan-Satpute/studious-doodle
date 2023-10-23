import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_SELECTION_SORT';

const code = `
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[i]) {
        // swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  }
}
`;

const selectionSort: TExecutionFunction = async (board, _args, animated) => {
  const array = board.getPrimaryStructure() as NodeArray;
  if (animated) {
    await _animatedSelectionSort(board, array);
  }
};

async function _animatedSelectionSort(board: Board, array: NodeArray) {
  board.pushStack('selectionSort(array)');
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.slateBlue;
    board.pushStep(codeKey, [3]);
    for (let j = i + 1; j < array.array.length; j++) {
      array.array[j].color = Color.grey;
      board.pushStep(codeKey, [4]);
      if (array.array[j].value < array.array[i].value) {
        // swap array.array[i] and array.array[j]
        [array.array[i].value, array.array[j].value] = [
          array.array[j].value,
          array.array[i].value,
        ];
        array.rearrange();
        board.pushStep(codeKey, [6]);
      }
      array.array[j].color = Color.transparent;
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

export default selectionSort;
