import reduxStore, {TReduxState} from '../../redux/store';
import {drawEdge} from './draw/edge';
import {drawLabel} from './draw/label';
import {drawNode} from './draw/node';

export function renderCanvas(ctx: CanvasRenderingContext2D) {
  const reduxState = reduxStore.getState() as TReduxState;
  const structureFrame = reduxState.structure.structureFrame;

  const frame = structureFrame;

  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';

  for (const node of frame.nodes) {
    drawNode(ctx, node);
  }

  for (const edge of frame.edges) {
    drawEdge(ctx, edge);
  }

  for (const label of frame.labels) {
    drawLabel(ctx, label);
  }
}
