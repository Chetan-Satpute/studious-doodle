import {NODE_HEIGHT, NODE_WIDTH} from './node';

import {ILabel} from '../types';

export function drawLabel(ctx: CanvasRenderingContext2D, label: ILabel) {
  const {x, y, text} = label;

  ctx.font = `${(NODE_HEIGHT * 3) / 5}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(text, x + NODE_WIDTH / 2, y + NODE_HEIGHT / 2);
}
