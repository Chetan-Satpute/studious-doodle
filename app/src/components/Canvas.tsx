import {useRef} from 'react';
import Alert from '@mui/material/Alert';

import useAnimationFrame from '../hooks/useAnimationFrame';
import useCanvasInteraction from '../hooks/useCanvasInteraction';
import {useAppSelector} from '../hooks/useAppSelector';

import {renderCanvas} from '../lib/canvas/renderCanvas';

function Canvas() {
  const showCanvasOverlay = useAppSelector(
    state => state.base.showCanvasOverlay
  );

  const canvasParentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {
    transformMatrix,
    onMouseDown,
    onTouchStart,
    onMouseMove,
    onTouchMove,
    onMouseUp,
    onTouchEnd,
    onWheel,
    onDoubleClick,
  } = useCanvasInteraction();

  const animationFrameCallback = () => {
    const parentElement = canvasParentRef.current;
    const canvasElement = canvasRef.current;
    if (parentElement === null || canvasElement === null) {
      return;
    }

    // resize and clear canvas
    canvasElement.width = parentElement.clientWidth;
    canvasElement.height = parentElement.clientHeight;

    const ctx = canvasElement.getContext('2d');
    if (ctx === null) {
      return;
    }

    ctx.setTransform(transformMatrix);

    renderCanvas(ctx);
  };

  useAnimationFrame(animationFrameCallback);

  return (
    <main ref={canvasParentRef} className="flex-1 flex overflow-auto relative">
      {showCanvasOverlay ? (
        <div className="h-full w-full t-0 l-0 absolute flex flex-col justify-center items-center p-3">
          <p className="text-lg lg:text-2xl text-center">
            Learn data structure and algorithms with animation and step-through
            debugging.
          </p>
          <Alert variant="outlined" severity="info">
            We recommend using full screen mode for the best user experience.
          </Alert>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseUp={onMouseUp}
          onTouchEnd={onTouchEnd}
          onWheel={onWheel}
          onDoubleClick={onDoubleClick}
        />
      )}
    </main>
  );
}

export default Canvas;
