import Board from '../board';
import {IFrame} from '../board/frame';

class Structure {
  id: number | null;
  board: Board | null;

  x: number;
  y: number;

  constructor() {
    this.id = null;
    this.board = null;

    this.x = 0;
    this.y = 0;
  }

  serialise(frame: IFrame) {}
  rearrange() {}

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.rearrange();
  }

  static fromData(d: unknown): Structure {
    return new Structure();
  }

  toData(): unknown {
    return null;
  }
}

export default Structure;
