import {Alert, Snackbar} from '@mui/material';

import {useAppSelector} from '../hooks/useAppSelector';

function ErrorSnackBar() {
  const errorMessage = useAppSelector(state => state.base.errorMessage);
  return (
    <Snackbar open={errorMessage !== ''} autoHideDuration={null}>
      <Alert severity="error" variant="outlined">
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackBar;
