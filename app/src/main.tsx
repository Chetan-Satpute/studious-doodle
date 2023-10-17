import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import App from './App.tsx';

import reduxStore from './redux/store.ts';
import {muiTheme} from './theme.ts';

import '@fontsource/permanent-marker';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <Provider store={reduxStore}>
          <CssBaseline />
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
