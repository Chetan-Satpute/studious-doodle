import NodeArray from '../..';
import Board from '../../../../board';
import Node from '../../../node';
import {TExecutionFunction} from '../../../../interface/types';
import {Color} from '../../../../color';

const codeKey = 'NODE_ARRAY_SET_ARRAY';

const code = `
function setArray(array, values) {
  if (array.length !== values.length) {
    array = new Array(values.length).fill(0);
  }

  for (let i = 0; i < values.length; i++) {
    array[i] = values[i];
  }

  return array;
}
`;

export const setArray: TExecutionFunction = async (board, args, animate) => {
  const array = board.getPrimaryStructure() as NodeArray;
  const values = args.values as number[];

  if (animate) {
    await _setArrayAnimated(board, array, values);
  } else {
    await _setArray(board, array, values);
  }
};

export async function _setArray(
  _board: Board,
  array: NodeArray,
  values: number[]
) {
  array.array = values.map(v => new Node(v));
  array.rearrange();
}

export async function _setArrayAnimated(
  board: Board,
  array: NodeArray,
  values: number[]
) {
  board.setCode(codeKey, code);

  board.pushStack(`array = setArray(values=[${values.toString()}])`);

  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);

  if (array.array.length !== values.length) {
    array.array = values.map(() => new Node(0));
    array.rearrange();

    board.pushStep(codeKey, [3]);
  }

  board.pushStep(codeKey, [6]);
  for (let i = 0; i < values.length; i++) {
    array.array[i].value = values[i];
    array.array[i].color = Color.grey;
    board.pushStep(codeKey, [7]);

    array.array[i].color = Color.transparent;
    board.pushStep(codeKey, [6]);
  }

  board.pushStep(codeKey, [10]);

  board.doneLastCall();
  board.pushStep(codeKey, [11]);
}
