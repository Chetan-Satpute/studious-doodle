import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_QUICK_SORT';

const code = `
function quickSort(array, startIndex, endIndex) {
  if (startIndex > endIndex) {
    return;
  }

  // Choosing last element as pivot
  let pivotIndex = endIndex;

  let i = startIndex - 1;
  for (let j = startIndex; j <= endIndex; j++) {
    if (array[j] <= array[pivotIndex]) {
      i += 1;

      // Swap array[i] and array[j]
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Position of pivot in sorted array
  let pivotPosition = i + 1;
  [array[pivotPosition], array[pivotIndex]] = [array[pivotIndex], array[pivotPosition]];

  quickSort(array, startIndex, pivotPosition - 1);
  quickSort(array, pivotPosition + 1, endIndex);
}
`;

const quickSort: TExecutionFunction = async (board, _args, animated) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (animated) {
    await _animatedQuickSort(board, array, 0, array.array.length - 1);
  }
};

async function _animatedQuickSort(
  board: Board,
  array: NodeArray,
  startIndex: number,
  endIndex: number
) {
  board.pushStack(
    `quickSort(array=${array.toString()}, startIndex=${startIndex}, endIndex=${endIndex})`
  );
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (startIndex > endIndex) {
    board.doneLastCall();
    board.pushStep(codeKey, [3]);
    return array;
  }

  const pivotIndex = endIndex;
  array.array[pivotIndex].color = Color.slateBlue;
  board.pushStep(codeKey, [7]);

  let i = startIndex - 1;
  board.pushStep(codeKey, [9]);

  board.pushStep(codeKey, [10]);
  for (let j = startIndex; j < endIndex; j++) {
    array.array[j].color = Color.grey;

    board.pushStep(codeKey, [11]);
    if (array.array[j].value <= array.array[pivotIndex].value) {
      if (i >= startIndex) {
        array.array[i].color = Color.transparent;
      }

      i += 1;
      array.array[i].color = Color.slateBlue;
      board.pushStep(codeKey, [12]);

      // Swap array[i] and array[j]
      [array.array[i].value, array.array[j].value] = [
        array.array[j].value,
        array.array[i].value,
      ];
      array.array[i].color = Color.slateBlue;
      if (i > startIndex) {
        array.array[i - 1].color = Color.transparent;
      }
      board.pushStep(codeKey, [15]);
    }

    if (j !== i) {
      array.array[j].color = Color.transparent;
    }
    board.pushStep(codeKey, [10]);
  }

  // Position of pivot in sorted array
  const pivotPosition = i + 1;
  if (i >= startIndex) {
    array.array[i].color = Color.transparent;
  }
  array.array[pivotPosition].color = Color.green;
  board.pushStep(codeKey, [20]);

  [array.array[pivotPosition].value, array.array[pivotIndex].value] = [
    array.array[pivotIndex].value,
    array.array[pivotPosition].value,
  ];

  array.array[pivotPosition].color = Color.green;
  board.pushStep(codeKey, [21]);
  if (pivotIndex !== pivotPosition) {
    array.array[pivotIndex].color = Color.transparent;
  }

  board.pushStep(codeKey, [23]);
  await _animatedQuickSort(board, array, startIndex, pivotPosition - 1);
  board.popStack();

  board.pushStep(codeKey, [24]);
  await _animatedQuickSort(board, array, pivotPosition + 1, endIndex);
  board.popStack();

  if (startIndex === 0 && endIndex === array.array.length - 1) {
    for (let i = 0; i < array.array.length; i++) {
      array.array[i].color = Color.transparent;
    }
  }

  board.doneLastCall();
  board.pushStep(codeKey, [25]);

  return array;
}

export default quickSort;
