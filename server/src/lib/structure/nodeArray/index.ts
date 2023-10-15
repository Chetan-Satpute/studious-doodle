import Structure from '..';
import {IFrame} from '../../board/frame';
import {randomNumberArray, randomValue} from '../../utils/random';
import Node from '../node';

class NodeArray extends Structure {
  array: Node[];

  constructor() {
    super();

    this.array = [];
  }

  serialise(frame: IFrame): void {
    for (const node of this.array) {
      node.serialise(frame);
    }
  }

  rearrange(): void {
    let x = this.x;
    for (const node of this.array) {
      node.x = x;
      node.y = this.y;

      x += Node.WIDTH;
    }
  }

  static fromData(data: number[]): Structure {
    const nodeArray = new NodeArray();
    for (const num of data) {
      nodeArray.array.push(new Node(num));
    }

    return nodeArray;
  }

  static generateRandom(): [Structure, unknown] {
    const length = randomValue(1, 10);
    const arrayData = randomNumberArray(length, 0, 100);

    return [NodeArray.fromData(arrayData), arrayData];
  }
}

export default NodeArray;
