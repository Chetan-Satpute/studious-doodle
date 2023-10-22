import NodeArray from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

export const bubbleSort: TExecutionFunction = async (board, args, animate) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (animate) {
    await _bubbleSort(board, array);
  } else {
    await _bubbleSortAnimated(board, array);
  }
};

async function _bubbleSort(board: Board, array: NodeArray) {}

async function _bubbleSortAnimated(board: Board, array: NodeArray) {}
