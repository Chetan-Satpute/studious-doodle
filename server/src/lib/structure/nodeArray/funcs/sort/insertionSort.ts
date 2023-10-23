import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_INSERTION_SORT';

const code = `
function insertionSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (array[j + 1] < array[j]) {
        // swap array[j] and array[j + 1]
        [array[j + 1], array[j]] = [array[j], array[j + 1]];
      } else {
        break;
      }
    }
  }
}
`;

const insertionSort: TExecutionFunction = async (board, _args, animated) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (animated) {
    await _animatedInsertionSort(board, array);
  }
};

async function _animatedInsertionSort(board: Board, array: NodeArray) {
  board.pushStack('insertionSort(array)');
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  for (let i = 0; i < array.array.length; i++) {
    const node = array.array[i];
    node.color = Color.slateBlue;
    board.pushStep(codeKey, [3]);
    for (let j = i - 1; j >= 0; j--) {
      board.pushStep(codeKey, [4]);
      if (array.array[j + 1].value < array.array[j].value) {
        // swap array.array[j] and array.array[j + 1]
        [array.array[j + 1], array.array[j]] = [
          array.array[j],
          array.array[j + 1],
        ];
        array.rearrange();
        board.pushStep(codeKey, [6]);
      } else {
        board.pushStep(codeKey, [8]);
        break;
      }

      board.pushStep(codeKey, [3]);
    }

    node.color = Color.green;
    board.pushStep(codeKey, [2]);
  }

  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.transparent;
  }

  board.doneLastCall();
  board.pushStep(codeKey, [12]);

  return array;
}

export default insertionSort;
