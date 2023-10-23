import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';
import Node from '../../../node';

const codeKey = 'NODE_ARRAY_MERGE_SORT';

const code = `
function mergeSort(array) {
  if (array.length <= 1) {
    return;
  }

  const midIndex = Math.floor(array.length / 2);

  const leftArray = new Array(midIndex).fill(0);
  const rightArray = new Array(array.length - midIndex).fill(0);

  for (let i = 0; i < leftArray.length; i++) {
    leftArray[i] = array[i];
  }

  for (let i = 0; i < rightArray.length; i++) {
    rightArray[i] = array[midIndex + i];
  }

  mergeSort(leftArray);
  mergeSort(rightArray);

  merge(array, leftArray, rightArray);
}

function merge(array, leftArray, rightArray) {
  let leftIndex = 0;
  let rightIndex = 0;

  for (let i = 0; i < array.length; i++) {
    if (leftIndex === leftArray.length) {
      array[i] = rightArray[rightIndex];

      rightIndex += 1;
      continue;
    }

    if (rightIndex === rightArray.length) {
      array[i] = leftArray[leftIndex];

      leftIndex += 1;
      continue;
    }

    if (leftArray[leftIndex] <= rightArray[rightIndex]) {
      array[i] = leftArray[leftIndex];

      leftIndex += 1;
      continue;
    }

    if (leftArray[leftIndex] > rightArray[rightIndex]) {
      array[i] = rightArray[rightIndex];

      rightIndex += 1;
      continue;
    }
  }
}
`;

const mergeSort: TExecutionFunction = async (board, _args, animated) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (animated) {
    await _animatedMergeSort(board, array);
  }
};

async function _animatedMergeSort(board: Board, array: NodeArray) {
  board.pushStack(`mergeSort(array=${array.toString()})`);
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  if (array.array.length <= 1) {
    board.pushStep(codeKey, [3]);

    board.doneLastCall();
    board.pushStep(codeKey, [23]);
    return array;
  }

  board.pushStep(codeKey, [6]);
  const midIndex = Math.floor(array.array.length / 2);

  const leftArray = new NodeArray();
  for (let i = 0; i < midIndex; i++) {
    leftArray.array.push(new Node());
  }

  leftArray.moveTo(array.x, array.y + Node.HEIGHT * 3);
  board.add(leftArray);
  board.pushStep(codeKey, [8]);

  const rightArray = new NodeArray();
  for (let i = 0; i < array.array.length - midIndex; i++) {
    rightArray.array.push(new Node());
  }

  rightArray.moveTo(
    array.x + midIndex * Node.WIDTH + Node.WIDTH,
    array.y + Node.HEIGHT * 3
  );
  board.add(rightArray);
  board.pushStep(codeKey, [9]);

  board.pushStep(codeKey, [11]);
  for (let i = 0; i < leftArray.array.length; i++) {
    leftArray.array[i].value = array.array[i].value;

    leftArray.array[i].color = Color.grey;
    array.array[i].color = Color.grey;
    board.pushStep(codeKey, [12]);

    leftArray.array[i].color = Color.transparent;
    array.array[i].color = Color.transparent;
    board.pushStep(codeKey, [11]);
  }

  board.pushStep(codeKey, [15]);
  for (let i = 0; i < rightArray.array.length; i++) {
    rightArray.array[i].value = array.array[midIndex + i].value;

    rightArray.array[i].color = Color.grey;
    array.array[midIndex + i].color = Color.grey;
    board.pushStep(codeKey, [16]);

    rightArray.array[i].color = Color.transparent;
    array.array[midIndex + i].color = Color.transparent;
    board.pushStep(codeKey, [15]);
  }

  board.pushStep(codeKey, [19]);
  _animatedMergeSort(board, leftArray);
  board.popStack();

  board.pushStep(codeKey, [20]);
  _animatedMergeSort(board, rightArray);
  board.popStack();

  board.pushStep(codeKey, [22]);
  _animatedMerge(board, array, leftArray, rightArray);
  board.popStack();

  board.remove(leftArray);
  board.remove(rightArray);

  board.doneLastCall();
  board.pushStep(codeKey, [23]);

  return array;
}

async function _animatedMerge(
  board: Board,
  array: NodeArray,
  leftArray: NodeArray,
  rightArray: NodeArray
) {
  board.pushStack(
    `merge(array=${array.toString()},leftArray=${leftArray.toString()},rightArray=${rightArray.toString()})`
  );
  board.pushStep(codeKey, [25]);

  board.pushStep(codeKey, [26]);
  let leftIndex = 0;

  board.pushStep(codeKey, [27]);
  let rightIndex = 0;

  if (array.array.length > 0) {
    array.array[0].color = Color.grey;
  }
  if (leftIndex < leftArray.array.length) {
    leftArray.array[leftIndex].color = Color.slateBlue;
  }
  if (rightIndex < rightArray.array.length) {
    rightArray.array[rightIndex].color = Color.slateBlue;
  }
  board.pushStep(codeKey, [29]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.grey;

    board.pushStep(codeKey, [30]);
    if (leftIndex === leftArray.array.length) {
      array.array[i].value = rightArray.array[rightIndex].value;
      board.pushStep(codeKey, [31]);

      rightArray.array[rightIndex].color = Color.transparent;
      rightIndex += 1;
      if (rightIndex < rightArray.array.length) {
        rightArray.array[rightIndex].color = Color.slateBlue;
      }
      board.pushStep(codeKey, [33]);
      board.pushStep(codeKey, [34]);
      array.array[i].color = Color.transparent;
      continue;
    }

    board.pushStep(codeKey, [37]);
    if (rightIndex === rightArray.array.length) {
      array.array[i].value = leftArray.array[leftIndex].value;
      board.pushStep(codeKey, [38]);

      leftArray.array[leftIndex].color = Color.transparent;
      leftIndex += 1;
      if (leftIndex < leftArray.array.length) {
        leftArray.array[leftIndex].color = Color.slateBlue;
      }
      board.pushStep(codeKey, [40]);
      board.pushStep(codeKey, [41]);
      array.array[i].color = Color.transparent;
      continue;
    }

    board.pushStep(codeKey, [44]);
    if (
      leftArray.array[leftIndex].value <= rightArray.array[rightIndex].value
    ) {
      array.array[i].value = leftArray.array[leftIndex].value;
      board.pushStep(codeKey, [45]);

      leftArray.array[leftIndex].color = Color.transparent;
      leftIndex += 1;
      if (leftIndex < leftArray.array.length) {
        leftArray.array[leftIndex].color = Color.slateBlue;
      }
      board.pushStep(codeKey, [47]);
      board.pushStep(codeKey, [48]);
      array.array[i].color = Color.transparent;
      continue;
    }

    board.pushStep(codeKey, [51]);
    if (leftArray.array[leftIndex].value > rightArray.array[rightIndex].value) {
      array.array[i].value = rightArray.array[rightIndex].value;
      board.pushStep(codeKey, [52]);

      rightArray.array[rightIndex].color = Color.transparent;
      rightIndex += 1;
      if (rightIndex < rightArray.array.length) {
        rightArray.array[rightIndex].color = Color.slateBlue;
      }
      board.pushStep(codeKey, [54]);
      board.pushStep(codeKey, [55]);
      array.array[i].color = Color.transparent;
      continue;
    }
  }

  board.doneLastCall();
  board.pushStep(codeKey, [58]);
}

export default mergeSort;
