import {useRef} from 'react';

interface IPoint {
  x: number;
  y: number;
}

function useCanvasInteraction() {
  const previousMatrixRef = useRef<DOMMatrix>(new DOMMatrix());
  const matrixRef = useRef<DOMMatrix>(new DOMMatrix());

  const dragStartRef = useRef<IPoint | null>(null);
  const pinchStartRef = useRef<number | null>(null);

  const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = event => {
    previousMatrixRef.current = DOMMatrix.fromMatrix(matrixRef.current);

    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const onTouchStart: React.TouchEventHandler<HTMLCanvasElement> = event => {
    previousMatrixRef.current = DOMMatrix.fromMatrix(matrixRef.current);

    // Drag start
    if (event.touches.length === 1) {
      dragStartRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }

    // Zoom start
    if (event.touches.length === 2) {
      pinchStartRef.current = Math.sqrt(
        (event.touches[1].clientX - event.touches[0].clientX) ** 2 +
          (event.touches[1].clientY - event.touches[0].clientY) ** 2
      );
    }
  };

  const onMouseMove: React.MouseEventHandler<HTMLCanvasElement> = event => {
    const matrix = matrixRef.current;
    const dragStart = dragStartRef.current;
    const previousMatrix = previousMatrixRef.current;

    if (dragStart) {
      matrix.e = previousMatrix.e + (event.clientX - dragStart.x);
      matrix.f = previousMatrix.f + (event.clientY - dragStart.y);
    }
  };

  const onTouchMove: React.TouchEventHandler<HTMLCanvasElement> = event => {
    const canvas = event.target as HTMLCanvasElement;

    const matrix = matrixRef.current;
    const dragStart = dragStartRef.current;
    const pinchStart = pinchStartRef.current;
    const previousMatrix = previousMatrixRef.current;

    if (pinchStart && event.touches.length === 2) {
      const canvasBoundingRect = canvas.getBoundingClientRect();

      const position: IPoint = {
        x:
          (event.touches[0].clientX + event.touches[1].clientX) / 2 -
          matrix.e -
          canvasBoundingRect.left,
        y:
          (event.touches[0].clientY + event.touches[1].clientY) / 2 -
          matrix.f -
          canvasBoundingRect.top,
      };

      const previousScale = {
        x: matrix.a,
        y: matrix.d,
      };

      const pinch = Math.sqrt(
        (event.touches[1].clientX - event.touches[0].clientX) ** 2 +
          (event.touches[1].clientY - event.touches[0].clientY) ** 2
      );

      const newScale = (pinch / pinchStart) * previousMatrix.a;

      matrix.a = newScale;
      matrix.d = newScale;

      // Lower Bound
      matrix.a = matrix.a >= 0.5 ? matrix.a : 0.5;
      matrix.d = matrix.d >= 0.5 ? matrix.d : 0.5;

      // Upper Bound
      matrix.a = matrix.a <= 1.5 ? matrix.a : 1.5;
      matrix.d = matrix.d <= 1.5 ? matrix.d : 1.5;

      const newPosition: IPoint = {
        x: (position.x / previousScale.x) * matrix.a,
        y: (position.y / previousScale.y) * matrix.d,
      };

      matrix.e -= newPosition.x - position.x;
      matrix.f -= newPosition.y - position.y;
    } else if (dragStart) {
      matrix.e = previousMatrix.e + (event.touches[0].clientX - dragStart.x);
      matrix.f = previousMatrix.f + (event.touches[0].clientY - dragStart.y);
    }
  };

  const onMouseUp: React.MouseEventHandler<HTMLCanvasElement> = () => {
    dragStartRef.current = null;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLCanvasElement> = () => {
    dragStartRef.current = null;
    pinchStartRef.current = null;
  };

  const onWheel: React.WheelEventHandler<HTMLCanvasElement> = event => {
    const canvas = event.target as HTMLCanvasElement;
    const matrix = matrixRef.current;

    const canvasBoundingRect = canvas.getBoundingClientRect();

    const position: IPoint = {
      x: event.clientX - matrix.e - canvasBoundingRect.left,
      y: event.clientY - matrix.f - canvasBoundingRect.top,
    };

    const previousScale = {
      x: matrix.a,
      y: matrix.d,
    };

    matrix.a -= event.deltaY * 0.001;
    matrix.d -= event.deltaY * 0.001;

    // Lower Bound
    matrix.a = matrix.a >= 0.5 ? matrix.a : 0.5;
    matrix.d = matrix.d >= 0.5 ? matrix.d : 0.5;

    // Upper Bound
    matrix.a = matrix.a <= 1.5 ? matrix.a : 1.5;
    matrix.d = matrix.d <= 1.5 ? matrix.d : 1.5;

    const newPosition: IPoint = {
      x: (position.x / previousScale.x) * matrix.a,
      y: (position.y / previousScale.y) * matrix.d,
    };

    matrix.e -= newPosition.x - position.x;
    matrix.f -= newPosition.y - position.y;
  };

  const onDoubleClick: React.MouseEventHandler<HTMLCanvasElement> = () => {
    // reset matrix on double click
    previousMatrixRef.current.a = 1;
    previousMatrixRef.current.b = 0;
    previousMatrixRef.current.c = 0;
    previousMatrixRef.current.d = 1;
    previousMatrixRef.current.e = 0;
    previousMatrixRef.current.f = 0;

    matrixRef.current.a = 1;
    matrixRef.current.b = 0;
    matrixRef.current.c = 0;
    matrixRef.current.d = 1;
    matrixRef.current.e = 0;
    matrixRef.current.f = 0;
  };

  return {
    transformMatrix: matrixRef.current,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWheel,
    onDoubleClick,
  };
}

export default useCanvasInteraction;
