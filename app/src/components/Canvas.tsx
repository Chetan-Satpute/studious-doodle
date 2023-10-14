import {useRef} from 'react';

import useAnimationFrame from '../hooks/useAnimationFrame';
import useCanvasInteraction from '../hooks/useCanvasInteraction';

import {renderCanvas} from '../lib/canvas/renderCanvas';

function Canvas() {
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
    <main ref={canvasParentRef} className="flex-1 flex overflow-auto">
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
    </main>
  );
}

export default Canvas;
