import {SideBarView} from '../../components/SideBar/types';
import reduxStore, {TReduxState} from '../../redux/store';
import {drawEdge} from './draw/edge';
import {drawLabel} from './draw/label';
import {drawNode} from './draw/node';

export const renderCanvas = (function () {
  let prevStepIndex = 0;
  let frameIndex = 0;

  return (ctx: CanvasRenderingContext2D) => {
    const reduxState = reduxStore.getState() as TReduxState;
    const structureFrame = reduxState.structure.structureFrame;
    const sideBarView = reduxState.base.sidebarView;

    let frame = structureFrame;

    if (sideBarView === SideBarView.Explore) {
      if (prevStepIndex !== reduxState.explore.currentStep) {
        frameIndex = 0;
        prevStepIndex = reduxState.explore.currentStep;
      }

      frame =
        reduxState.explore.steps[reduxState.explore.currentStep].frames[
          frameIndex
        ];

      frameIndex = Math.min(
        reduxState.explore.steps[reduxState.explore.currentStep].frames.length -
          1,
        frameIndex + 1
      );
    }

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
  };
})();
