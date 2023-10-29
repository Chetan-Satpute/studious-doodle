import Structure from '..';
import Board from '../../board';
import {EdgeType, IEdge, IFrame} from '../../board/frame';
import {randomNumberArray, randomValue} from '../../utils/random';
import Node from '../node';

export class LinkedListNode extends Node {
  left: LinkedListNode | null;
  right: LinkedListNode | null;

  leftEdgePercent: number;
  rightEdgePercent: number;

  constructor(value?: number) {
    super(value);

    this.left = null;
    this.right = null;

    this.leftEdgePercent = 100;
    this.rightEdgePercent = 100;
  }

  serialise(frame: IFrame): void {
    super.serialise(frame);

    if (this.right !== null) {
      const edge: IEdge = {
        startNodePosition: {x: this.x, y: this.y},
        endNodePosition: {x: this.right.x, y: this.right.y},
        type: EdgeType.DOUBLE_DIRECTED,
        percent: this.rightEdgePercent,
      };

      if (this.right.left === this) {
        edge.percent += this.right.leftEdgePercent * 1000;
      }

      frame.edges.push(edge);
    }
  }

  growRightEdge(board: Board) {
    this.rightEdgePercent = 0;

    for (let i = 1; i <= 100; i++) {
      this.rightEdgePercent = i;
      board.pushFrame();
    }
  }

  growLeftEdge(board: Board) {
    this.leftEdgePercent = 0;

    for (let i = 1; i <= 100; i++) {
      this.leftEdgePercent = i;
      board.pushFrame();
    }
  }

  shrinkRightEdge(board: Board) {
    this.rightEdgePercent = 100;

    for (let i = 100; i >= 0; i--) {
      this.rightEdgePercent = i;
      board.pushFrame();
    }
  }

  shrinkLeftEdge(board: Board) {
    this.leftEdgePercent = 100;

    for (let i = 100; i >= 0; i--) {
      this.leftEdgePercent = i;
      board.pushFrame();
    }
  }
}

class LinkedList extends Structure {
  head: LinkedListNode | null;

  constructor() {
    super();

    this.head = null;
  }

  serialise(frame: IFrame): void {
    let node = this.head;
    while (node !== null) {
      node.serialise(frame);
      node = node.right;
    }

    frame.labels.push({
      x: this.x,
      y: this.y - LinkedListNode.HEIGHT,
      text: 'head',
    });
  }

  rearrange(): void {
    let x = this.x;

    let node = this.head;
    while (node !== null) {
      node.x = x;
      node.y = this.y;

      x += Node.WIDTH * 2;
      node = node.right;
    }
  }

  toData(): unknown {
    const data: number[] = [];

    let node = this.head;
    while (node !== null) {
      data.push(node.value);
      node = node.right;
    }

    return data;
  }

  static fromData(d: unknown): Structure {
    const data = d as number[];

    const list = new LinkedList();
    list.head = new LinkedListNode(data[0]);

    let node = list.head;
    for (let i = 1; i < data.length; i++) {
      node.right = new LinkedListNode(data[i]);
      node.right.left = node;

      node = node.right;
    }

    return list;
  }

  static generateRandom(): Structure {
    const length = randomValue(1, 10);
    const arrayData = randomNumberArray(length, 0, 100);

    const list = new LinkedList();
    list.head = new LinkedListNode(arrayData[0]);

    let node = list.head;
    for (let i = 1; i < arrayData.length; i++) {
      node.right = new LinkedListNode(arrayData[i]);
      node.rightEdgePercent = 100;

      node.right.left = node;
      node.right.leftEdgePercent = 100;

      node = node.right;
    }

    return list;
  }
}

export default LinkedList;
