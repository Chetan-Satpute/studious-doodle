import {NODE_HEIGHT, NODE_WIDTH} from './node';
import {EdgeType, IEdge, IPoint} from '../types';

export const HEAD_LENGTH = 10;

export function drawEdge(ctx: CanvasRenderingContext2D, edge: IEdge) {
  const {startNodePosition, endNodePosition, type, percent} = edge;

  const startCenter = {
    x: startNodePosition.x + NODE_WIDTH / 2,
    y: startNodePosition.y + NODE_HEIGHT / 2,
  };

  const endCenter = {
    x: endNodePosition.x + NODE_WIDTH / 2,
    y: endNodePosition.y + NODE_HEIGHT / 2,
  };

  const angle = getAngle(startCenter, endCenter);

  if (type === EdgeType.DIRECTED) {
    const startPoint = getEndPoint(startCenter, angle);
    const endPoint = getEndPoint(endCenter, (angle + Math.PI) % (Math.PI * 2));

    const length = getLength(startPoint, endPoint);

    endPoint.x = startPoint.x + (Math.cos(angle) * length * percent) / 100;
    endPoint.y = startPoint.y + (Math.sin(angle) * length * percent) / 100;

    // line segment
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();

    ctx.stroke();

    // head
    ctx.beginPath();
    ctx.moveTo(endPoint.x, endPoint.y);
    ctx.lineTo(
      endPoint.x - HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
      endPoint.y - HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
    );
    ctx.lineTo(
      endPoint.x - HEAD_LENGTH * Math.cos(angle + Math.PI / 7),
      endPoint.y - HEAD_LENGTH * Math.sin(angle + Math.PI / 7)
    );
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();

    ctx.fill();
  } else if (type === EdgeType.UNDIRECTED) {
    const startPoint = getEndPoint(startCenter, angle);
    const endPoint = getEndPoint(endCenter, (angle + Math.PI) % (Math.PI * 2));

    const length = getLength(startPoint, endPoint);

    endPoint.x = startPoint.x + (Math.cos(angle) * length * percent) / 100;
    endPoint.y = startPoint.y + (Math.sin(angle) * length * percent) / 100;

    // line segment
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.closePath();

    ctx.stroke();
  } else if (type === EdgeType.DOUBLE_DIRECTED) {
    const percentA = Math.floor(percent % 1000);
    const percentB = Math.floor(percent / 1000);

    const startA = getEndPoint(startCenter, (angle + 0.1) % (Math.PI * 2));
    const startB = getEndPoint(
      startCenter,
      (angle - 0.1 + Math.PI * 2) % (Math.PI * 2)
    );

    const endA = getEndPoint(
      endCenter,
      (angle + 0.1 + Math.PI) % (Math.PI * 2)
    );
    const endB = getEndPoint(
      endCenter,
      (angle - 0.1 + Math.PI) % (Math.PI * 2)
    );

    const lengthA = getLength(startA, endB);
    const lengthB = getLength(startB, endA);

    endB.x = startA.x + (Math.cos(angle) * lengthA * percentA) / 100;
    endB.y = startA.y + (Math.sin(angle) * lengthA * percentA) / 100;

    startB.x = endA.x - (Math.cos(angle) * lengthB * percentB) / 100;
    startB.y = endA.y - (Math.sin(angle) * lengthB * percentB) / 100;

    if (getLength(startA, endB) >= HEAD_LENGTH) {
      // line segment A
      ctx.beginPath();
      ctx.moveTo(startA.x, startA.y);
      ctx.lineTo(endB.x, endB.y);
      ctx.closePath();

      ctx.stroke();

      // head on segment A
      ctx.beginPath();
      ctx.moveTo(endB.x, endB.y);
      ctx.lineTo(
        endB.x - HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
        endB.y - HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
      );

      ctx.lineTo(
        endB.x - HEAD_LENGTH * Math.cos(angle),
        endB.y - HEAD_LENGTH * Math.sin(angle)
      );

      ctx.moveTo(endB.x, endB.y);

      ctx.closePath();

      ctx.fill();
    }

    if (getLength(startB, endA) >= HEAD_LENGTH) {
      // line segment B
      ctx.beginPath();
      ctx.moveTo(startB.x, startB.y);
      ctx.lineTo(endA.x, endA.y);
      ctx.closePath();

      ctx.stroke();

      // head on segment B
      ctx.beginPath();
      ctx.moveTo(startB.x, startB.y);
      ctx.lineTo(
        startB.x + HEAD_LENGTH * Math.cos(angle - Math.PI / 7),
        startB.y + HEAD_LENGTH * Math.sin(angle - Math.PI / 7)
      );

      ctx.lineTo(
        startB.x + HEAD_LENGTH * Math.cos(angle),
        startB.y + HEAD_LENGTH * Math.sin(angle)
      );

      ctx.moveTo(startB.x, startB.y);

      ctx.closePath();

      ctx.fill();
    }
  }
}

function getEndPoint(center: IPoint, angle: number) {
  const absTanAngle = Math.abs(Math.tan(angle));
  const point = {x: center.x, y: center.y};

  const nodeAngle = Math.atan2(NODE_HEIGHT, NODE_WIDTH);

  switch (true) {
    case angle === 0:
      point.x += NODE_WIDTH / 2;
      break;
    case angle < nodeAngle:
      point.x += NODE_WIDTH / 2;
      point.y += absTanAngle * (NODE_WIDTH / 2);
      break;
    case angle < Math.PI / 2:
      point.x += (1 / absTanAngle) * (NODE_HEIGHT / 2);
      point.y += NODE_HEIGHT / 2;
      break;
    case angle === Math.PI / 2:
      point.y += NODE_HEIGHT / 2;
      break;
    case angle < Math.PI - nodeAngle:
      point.x -= (1 / absTanAngle) * (NODE_HEIGHT / 2);
      point.y += NODE_HEIGHT / 2;
      break;
    case angle < Math.PI:
      point.x -= NODE_WIDTH / 2;
      point.y += absTanAngle * (NODE_WIDTH / 2);
      break;
    case angle === Math.PI:
      point.x -= NODE_WIDTH / 2;
      break;
    case angle < Math.PI + nodeAngle:
      point.x -= NODE_WIDTH / 2;
      point.y -= absTanAngle * (NODE_WIDTH / 2);
      break;
    case angle < (Math.PI * 3) / 2:
      point.x -= (1 / absTanAngle) * (NODE_HEIGHT / 2);
      point.y -= NODE_HEIGHT / 2;
      break;
    case angle === (Math.PI * 3) / 2:
      point.y -= NODE_HEIGHT / 2;
      break;
    case angle < Math.PI * 2 - nodeAngle:
      point.x += (1 / absTanAngle) * (NODE_HEIGHT / 2);
      point.y -= NODE_HEIGHT / 2;
      break;
    case angle < Math.PI * 2:
      point.x += NODE_WIDTH / 2;
      point.y -= absTanAngle * (NODE_WIDTH / 2);
      break;
    case angle === Math.PI * 2:
      point.x += NODE_WIDTH / 2;
      break;
  }

  return point;
}

function getAngle(start: IPoint, end: IPoint): number {
  const yDiff = end.y - start.y;
  const xDiff = end.x - start.x;

  let angle = Math.atan2(yDiff, xDiff);
  if (angle < 0) {
    // To prevent negative angle values
    // convert angle in the range (0, 2 * Math.PI)
    angle += Math.PI * 2;
  }

  return angle;
}

function getLength(start: IPoint, end: IPoint): number {
  const yDiff = end.y - start.y;
  const xDiff = end.x - start.x;

  return Math.sqrt(yDiff * yDiff + xDiff * xDiff);
}
