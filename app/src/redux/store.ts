import {configureStore} from '@reduxjs/toolkit';

import {structureReducer} from './structure/structureSlice';

const reduxStore = configureStore({
  reducer: {
    structure: structureReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TReduxState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type TAppDispatch = typeof reduxStore.dispatch;

export default reduxStore;
