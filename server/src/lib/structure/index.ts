import {IFrame} from '../board/frame';

class Structure {
  x: number;
  y: number;

  constructor() {
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
}

export default Structure;
