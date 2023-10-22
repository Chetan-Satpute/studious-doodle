import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {setErrorMessage} from '../redux/base/baseSlice';
import {API_ENDPOINT} from '../constant/env';
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
      retry = true;
      dispatch(
        setErrorMessage('Network Error: Retrying to Establish Connection.')
      );
    }

    if (!retry && !response) {
      retry = true;
      dispatch(
        setErrorMessage('Network Error: Retrying to Establish Connection.')
      );
    }

    if (retry) {
      // Wait for 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      dispatch(setErrorMessage(''));
    }
  }

  try {
    if (!response) {
      dispatch(setErrorMessage('Something went wrong!'));
      return {};
    }

    const data = await response.json();
    return {status: response.status, data: data};
  } catch {
    dispatch(setErrorMessage('Something went wrong!'));
  }

  return {};
}
