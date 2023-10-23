import NodeArray from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

export const sort: TExecutionFunction = async (board, _args, animate) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (!animate) {
    await _sort(board, array);
  }
};

async function _sort(_board: Board, array: NodeArray) {
  const values = array.array.map(node => node.value);
  values.sort((a, b) => a - b);

  for (let i = 0; i < values.length; i++) {
    array.array[i].value = values[i];
  }
}
