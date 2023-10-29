import Structure from '..';
import {EdgeType, IEdge, IFrame} from '../../board/frame';
import {randomNumberArray, randomValue} from '../../utils/random';
import Node from '../node';

class LinkedListNode extends Node {
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

      if (node.right !== null) {
        const edge: IEdge = {
          startNodePosition: {x: node.x, y: node.y},
          endNodePosition: {x: node.right.x, y: node.right.y},
          type: EdgeType.DOUBLE_DIRECTED,
          percent: node.rightEdgePercent,
        };

        if (node.right.left === node) {
          edge.percent += node.right.leftEdgePercent * 1000;
        }

        frame.edges.push(edge);
      }

      node = node.right;
    }
  }

  rearrange(): void {
    let x = this.x;

    let node = this.head;
    while (node !== null) {
      node.x = x;
      node.y = this.y;

      x += (Node.WIDTH * 3) / 2;
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
