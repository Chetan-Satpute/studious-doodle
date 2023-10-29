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
    for (let i = 0; i < this.array.length; i++) {
      this.array[i].x = x;
      this.array[i].y = this.y;

      x += Node.WIDTH;

      if (i === 0 && i === this.array.length - 1) {
        this.array[i].corners = 0b1111;
      } else if (i === 0) {
        this.array[i].corners = 0b1001;
      } else if (i === this.array.length - 1) {
        this.array[i].corners = 0b0110;
      } else {
        this.array[i].corners = 0b0000;
      }
    }
  }

  toData(): unknown {
    return this.array.map(node => node.value);
  }

  static fromData(d: unknown): Structure {
    const data = d as number[];

    const nodeArray = new NodeArray();
    for (const num of data) {
      nodeArray.array.push(new Node(num));
    }

    nodeArray.rearrange();

    return nodeArray;
  }

  static generateRandom(): Structure {
    const length = randomValue(1, 10);
    const arrayData = randomNumberArray(length, 0, 100);

    return NodeArray.fromData(arrayData);
  }

  toString() {
    return '[' + this.array.map(node => node.value).toString() + ']';
  }
}

export default NodeArray;
