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

  animatedMoveTo(board: Board, x: number, y: number) {
    while (this.x !== x || this.y !== y) {
      const diffX = x - this.x;
      const diffY = y - this.y;

      if (diffX !== 0) {
        this.x += diffX / Math.abs(diffX);
      }

      if (diffY !== 0) {
        this.y += diffY / Math.abs(diffY);
      }

      this.rearrange();
      board.pushFrame();
    }
  }

  static animatedMoveAll(
    board: Board,
    x: number,
    y: number,
    structs: Structure[]
  ) {
    let ticks = Math.max(Math.abs(x), Math.abs(y));

    while (ticks--) {
      for (let i = 0; i < structs.length; i++) {
        if (x < 0) structs[i].x--;
        if (x > 0) structs[i].x++;

        if (y < 0) structs[i].y--;
        if (y > 0) structs[i].y++;
      }

      if (x < 0) x++;
      if (x > 0) x--;

      if (y < 0) y++;
      if (y > 0) y--;

      board.pushFrame();
    }
  }

  static animatedMoveAllV2(
    board: Board,
    movements: {struct: Structure; x: number; y: number}[]
  ) {
    let tick = true;

    while (tick) {
      tick = false;

      for (let i = 0; i < movements.length; i++) {
        if (movements[i].x < 0) movements[i].struct.x--, movements[i].x++;
        if (movements[i].x > 0) movements[i].struct.x++, movements[i].x--;

        if (movements[i].y < 0) movements[i].struct.y--, movements[i].y++;
        if (movements[i].y > 0) movements[i].struct.y++, movements[i].y--;

        if (movements[i].x || movements[i].y) {
          tick = true;
        }
      }

      board.pushFrame();
    }
  }

  static fromData(d: unknown): Structure {
    return new Structure();
  }

  toData(): unknown {
    return null;
  }

  static generateRandom(): Structure {
    return new Structure();
  }
}

export default Structure;
