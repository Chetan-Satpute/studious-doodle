import LinkedList from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

export const generateRandom: TExecutionFunction = async (
  board,
  _args,
  animate
) => {
  const linkedList = board.getPrimaryStructure() as LinkedList;

  if (!animate) {
    _generateRandom(board, linkedList);
  }
};

async function _generateRandom(board: Board, _linkedList: LinkedList) {
  const randomList = LinkedList.generateRandom();
  randomList.moveTo(100, 100);
  board.setPrimaryStructure(randomList);
}

export default generateRandom;
