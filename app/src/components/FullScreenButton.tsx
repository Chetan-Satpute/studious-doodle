import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fullscreen from '@mui/icons-material/Fullscreen';
import FullscreenExit from '@mui/icons-material/FullscreenExit';

import {useFullScreen} from '../hooks/useFullScreen';

interface Props {
  className?: string;
  iconOnly?: boolean;
}

function FullScreenButton(props: Props) {
  const {className, iconOnly} = props;

  const {isFullscreen, toggleFullScreen} = useFullScreen();

  const icon = isFullscreen ? <FullscreenExit /> : <Fullscreen />;

  if (iconOnly) {
    return (
      <IconButton color="primary" onClick={toggleFullScreen}>
        {icon}
      </IconButton>
    );
  }

  return (
    <Button className={className} startIcon={icon} onClick={toggleFullScreen}>
      Fullscreen
    </Button>
  );
}

export default FullScreenButton;
