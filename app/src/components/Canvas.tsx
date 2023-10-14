import {useRef} from 'react';
import useAnimationFrame from '../hooks/useAnimationFrame';
import {renderCanvas} from '../lib/canvas/renderCanvas';

function Canvas() {
  const canvasParentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    renderCanvas(ctx);
  };

  useAnimationFrame(animationFrameCallback);

  return (
    <main ref={canvasParentRef} className="flex-1 flex overflow-auto">
      <canvas ref={canvasRef} />
    </main>
  );
}

export default Canvas;
