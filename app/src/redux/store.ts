import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';

import {baseReducer} from './base/baseSlice';
import {structureReducer} from './structure/structureSlice';

const reduxStore = configureStore({
  reducer: {
    base: baseReducer,
    structure: structureReducer,
  },
});

export type TReduxState = ReturnType<typeof reduxStore.getState>;
export type TAppDispatch = typeof reduxStore.dispatch;
export type TAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  TReduxState,
  unknown,
  Action<string>
>;

export default reduxStore;
