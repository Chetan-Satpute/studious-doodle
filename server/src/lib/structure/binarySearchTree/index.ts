import Structure from '..';
import Board from '../../board';
import {EdgeType, IFrame} from '../../board/frame';
import {randomNumberArray, randomValue} from '../../utils/random';
import Node from '../node';

type BinarySearchTreeData =
  | [number, BinarySearchTreeData, BinarySearchTreeData]
  | null;

export class BinarySearchTreeNode extends Node {
  left: BinarySearchTreeNode | null;
  right: BinarySearchTreeNode | null;

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

    if (this.left !== null) {
      frame.edges.push({
        type: EdgeType.DIRECTED,
        startNodePosition: {x: this.x, y: this.y},
        endNodePosition: {x: this.left.x, y: this.left.y},
        percent: this.leftEdgePercent,
      });
    }

    if (this.right !== null) {
      frame.edges.push({
        type: EdgeType.DIRECTED,
        startNodePosition: {x: this.x, y: this.y},
        endNodePosition: {x: this.right.x, y: this.right.y},
        percent: this.rightEdgePercent,
      });
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

class BinarySearchTree extends Structure {
  root: BinarySearchTreeNode | null;

  constructor() {
    super();

    this.root = null;
  }

  serialise(frame: IFrame): void {
    if (this.root) {
      frame.labels.push({
        x: this.root.x,
        y: this.root.y - BinarySearchTreeNode.HEIGHT,
        text: 'root',
      });
    }

    this._serialise(frame, this.root);
  }

  private _serialise(frame: IFrame, node: BinarySearchTreeNode | null) {
    if (node === null) {
      return;
    }

    node.serialise(frame);
    this._serialise(frame, node.left);
    this._serialise(frame, node.right);
  }

  rearrange(): void {
    let index = 0;

    const _rearrange = (node: BinarySearchTreeNode | null, height: number) => {
      if (node === null) {
        return;
      }

      _rearrange(node.left, height + 1);

      node.moveTo(
        index * BinarySearchTreeNode.WIDTH,
        height * BinarySearchTreeNode.HEIGHT * 2
      );
      index += 1;

      _rearrange(node.right, height + 1);
    };

    _rearrange(this.root, 0);
  }

  toData(): unknown {
    const _recurse = (
      node: BinarySearchTreeNode | null
    ): BinarySearchTreeData => {
      if (node === null) {
        return null;
      }

      return [node.value, _recurse(node.left), _recurse(node.right)];
    };

    return _recurse(this.root);
  }

  insert(value: number) {
    const node = new BinarySearchTreeNode(value);

    if (this.root === null) {
      this.root = node;
      return;
    }

    let ptr = this.root;
    while (ptr) {
      if (ptr.value === value) {
        return;
      } else if (ptr.value < value) {
        if (ptr.right === null) {
          ptr.right = node;
          return;
        } else {
          ptr = ptr.right;
        }
      } else if (ptr.value > value) {
        if (ptr.left === null) {
          ptr.left = node;
          return;
        } else {
          ptr = ptr.left;
        }
      }
    }
  }

  static fromData(d: unknown): BinarySearchTree {
    const sourceData = d as BinarySearchTreeData;

    const _fromData = (data: BinarySearchTreeData) => {
      if (data === null) {
        return null;
      }

      const node = new BinarySearchTreeNode(data[0]);
      node.left = _fromData(data[1]);
      node.right = _fromData(data[2]);

      return node;
    };

    const root = _fromData(sourceData);

    const tree = new BinarySearchTree();
    tree.root = root;

    return tree;
  }

  static generateRandom(): BinarySearchTree {
    const length = randomValue(1, 10);
    const arrayData = randomNumberArray(length, 0, 100);

    const tree = new BinarySearchTree();

    for (const value of arrayData) {
      tree.insert(value);
    }

    return tree;
  }

  allNodesBefore(node: BinarySearchTreeNode | null): BinarySearchTreeNode[] {
    if (node === null) {
      return [];
    }

    const nodes: BinarySearchTreeNode[] = [];
    let flag = true;

    const _recurse = (_node: BinarySearchTreeNode | null) => {
      if (_node === null) {
        return;
      }

      _recurse(_node.left);

      if (_node === node) {
        flag = false;
      }

      if (flag) {
        nodes.push(_node);
      }
      _recurse(_node.right);
    };

    _recurse(this.root);

    return nodes;
  }

  allNodesAfter(node: BinarySearchTreeNode | null): BinarySearchTreeNode[] {
    if (node === null) {
      return [];
    }

    const nodes: BinarySearchTreeNode[] = [];
    let flag = false;

    const _recurse = (_node: BinarySearchTreeNode | null) => {
      if (_node === null) {
        return;
      }

      _recurse(_node.left);

      if (flag) {
        nodes.push(_node);
      } else if (_node === node) {
        flag = true;
      }

      _recurse(_node.right);
    };

    _recurse(this.root);

    return nodes;
  }
}

export default BinarySearchTree;
