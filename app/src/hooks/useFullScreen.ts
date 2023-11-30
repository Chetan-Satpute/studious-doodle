import {useLayoutEffect, useState} from 'react';

export function useFullScreen() {
  const [isFullscreen, setIsFullscreen] = useState(
    document.fullscreenElement !== null
  );

  useLayoutEffect(() => {
    const handleWindowResize = () => {
      if (window.innerHeight === screen.height) {
        setIsFullscreen(true);
      }
    };

    const handleFullScreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const toggleFullScreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };

  return {isFullscreen, toggleFullScreen};
}
