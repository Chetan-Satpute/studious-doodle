import Structure from '..';
import {IFrame} from '../../board/frame';
import {Color} from '../../color';

class Node extends Structure {
  value: number;

  corners: number;
  color: Color;

  static WIDTH = 60;
  static HEIGHT = 30;

  constructor(value = 0) {
    super();

    this.value = value;
    this.corners = 0b1111;
    this.color = Color.transparent;
  }

  serialise(frame: IFrame): void {
    frame.nodes.push({
      x: this.x,
      y: this.y,

      value: this.value,
      color: this.color,
      corners: this.corners,
    });
  }
}

export default Node;
