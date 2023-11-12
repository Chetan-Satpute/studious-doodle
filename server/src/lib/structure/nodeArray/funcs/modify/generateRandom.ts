import NodeArray from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

export const generateRandom: TExecutionFunction = async (
  board,
  _args,
  animate
) => {
  const array = board.getPrimaryStructure() as NodeArray;

  if (!animate) {
    _generateRandom(board, array);
  }
};

async function _generateRandom(board: Board, _array: NodeArray) {
  const randomArray = NodeArray.generateRandom();
  randomArray.moveTo(100, 100);
  board.setPrimaryStructure(randomArray);
}

export default generateRandom;
