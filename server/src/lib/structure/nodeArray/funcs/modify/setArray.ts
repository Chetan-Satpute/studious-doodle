import NodeArray from '../..';
import Board from '../../../../board';
import Node from '../../../node';
import {TExecutionFunction} from '../../../../interface/types';

export const setArray: TExecutionFunction = async (board, args, animate) => {
  const array = board.getPrimaryStructure() as NodeArray;
  const values = args.values as number[];

  if (!animate) {
    _setArray(board, array, values);
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
