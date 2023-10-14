import {INode} from '../types';

export const NODE_HEIGHT = 30;
export const NODE_WIDTH = 60;

export const NODE_BORDER_RADIUS = NODE_HEIGHT / 4;

export function drawNode(ctx: CanvasRenderingContext2D, node: INode) {
  const {x, y, value, color, corners} = node;

  // Border radius list for each corner
  const borderRadius = [
    corners & 0b1000 ? NODE_BORDER_RADIUS : 0,
    corners & 0b0100 ? NODE_BORDER_RADIUS : 0,
    corners & 0b0010 ? NODE_BORDER_RADIUS : 0,
    corners & 0b0001 ? NODE_BORDER_RADIUS : 0,
  ];

  ctx.beginPath();
  ctx.roundRect(x, y, NODE_WIDTH, NODE_HEIGHT, borderRadius);
  ctx.closePath();

  // Fill background color
  const gradient = ctx.createRadialGradient(
    x + NODE_WIDTH / 2,
    y + NODE_HEIGHT / 2,
    Math.sqrt((NODE_WIDTH / 2) ** 2 + (NODE_HEIGHT / 2) ** 2),
    x + NODE_WIDTH / 2,
    y + NODE_HEIGHT / 2,
    0
  );

  gradient.addColorStop(0, color);
  gradient.addColorStop(1, 'transparent');

  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw boundry
  ctx.stroke();

  // Value of in center
  ctx.font = `${(NODE_HEIGHT * 3) / 5}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.fillText(
    Number.isNaN(value) ? '-' : value.toString(),
    x + NODE_WIDTH / 2,
    y + NODE_HEIGHT / 2
  );
}
