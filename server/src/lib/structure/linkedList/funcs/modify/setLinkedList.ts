import LinkedList, {LinkedListNode} from '../..';
import Board from '../../../../board';
import {TExecutionFunction} from '../../../../interface/types';

const setLinkedList: TExecutionFunction = async (board, args, animate) => {
  const list = board.getPrimaryStructure() as LinkedList;
  const values = args.values as number[];

  if (!animate) {
    _setLinkedList(board, list, values);
  }
};

async function _setLinkedList(
  board: Board,
  list: LinkedList,
  values: number[]
) {
  if (values.length === 0) {
    board.setPrimaryStructure(new LinkedList());
    return;
  }

  list.head = new LinkedListNode(values[0]);
  let node = list.head;
  for (let i = 1; i < values.length; i++) {
    node.right = new LinkedListNode(values[i]);
    node.right.left = node;

    node = node.right;
  }

  list.rearrange();
}

export default setLinkedList;
