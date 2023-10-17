import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {API_ENDPOINT} from '../constant/env';
import {setErrorMessage} from '../redux/base/baseSlice';
import {TReduxState} from '../redux/store';

export async function apiCall(
  route: string,
  method: 'GET' | 'POST',
  payload: Object | null,
  dispatch: ThunkDispatch<TReduxState, unknown, Action<string>>
) {
  let response: Response | null = null;
  let retry = true;

  while (retry) {
    retry = false;

    console.log(`${API_ENDPOINT}${route}`);

    try {
      switch (method) {
        case 'GET':
          response = await fetch(`${API_ENDPOINT}${route}`);
          break;
        case 'POST':
          response = await fetch(`${API_ENDPOINT}${route}`, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          break;
      }
    } catch (err) {
      console.log(err);
      retry = true;
      dispatch(
        setErrorMessage('Network Error: Retrying to Establish Connection.')
      );
    }
    console.log(response);

    if (!retry && !response) {
      retry = true;
      dispatch(
        setErrorMessage('Network Error: Retrying to Establish Connection.')
      );
    }

    if (retry) {
      // Wait for 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  try {
    const data = await response?.json();
    return data;
  } catch {
    dispatch(setErrorMessage('Something went wrong!'));
  }
}
