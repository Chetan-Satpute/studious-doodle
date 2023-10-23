import NodeArray from '../..';
import Board from '../../../../board';
import {Color} from '../../../../color';
import {TExecutionFunction} from '../../../../interface/types';

const codeKey = 'NODE_ARRAY_LINEAR_SEARCH';
const code = `
function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }

  return array.length;
}
`;

export const linearSearch: TExecutionFunction = async (
  board,
  args,
  animated
) => {
  const array = board.getPrimaryStructure() as NodeArray;
  const target = args.target as number;

  if (animated) {
    await _linearSearchAnimated(board, array, target);
  }
};

async function _linearSearchAnimated(
  board: Board,
  array: NodeArray,
  target: number
) {
  board.pushStack(`linearSearch(array=${array.toString()}, target=${target})`);
  board.setCode(codeKey, code);
  board.pushStep(codeKey, [1]);

  board.pushStep(codeKey, [2]);
  for (let i = 0; i < array.array.length; i++) {
    array.array[i].color = Color.grey;
    board.pushStep(codeKey, [3]);
    if (array.array[i].value === target) {
      array.array[i].color = Color.green;
      board.pushStep(codeKey, [4]);

      array.array[i].color = Color.transparent;
      board.doneLastCall();
      board.pushStep(codeKey, [9]);
      return i;
    } else {
      array.array[i].color = Color.red;
      board.pushStep(codeKey, [3]);
    }

    array.array[i].color = Color.transparent;
    board.pushStep(codeKey, [2]);
  }

  board.pushStep(codeKey, [8]);
  board.doneLastCall();
  board.pushStep(codeKey, [9]);
  return array.array.length;
}

export default linearSearch;
