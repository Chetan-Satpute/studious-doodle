import {useEffect} from 'react';

function useAnimationFrame(callback: () => void) {
  useEffect(() => {
    let animationFrameId: number | null = null;

    const animationFrameCallback = () => {
      callback();
      animationFrameId = window.requestAnimationFrame(animationFrameCallback);
    };

    animationFrameId = window.requestAnimationFrame(animationFrameCallback);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [callback]);
}

export default useAnimationFrame;
