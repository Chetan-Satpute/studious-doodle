import {createSlice} from '@reduxjs/toolkit';

import {SideBarView} from '../../components/SideBar/types';

import {setErrorMessageReducer, changeSideBarViewReducer} from './reducer';

export interface BaseState {
  sidebarView: SideBarView;
  errorMessage: string;
  showCanvasOverlay: boolean;
}

const initialState: BaseState = {
  sidebarView: SideBarView.ChooseStructure,
  errorMessage: '',
  showCanvasOverlay: true,
};

const baseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setErrorMessage: setErrorMessageReducer,
    changeSidebarView: changeSideBarViewReducer,
  },
});

export const {setErrorMessage, changeSidebarView} = baseSlice.actions;

export const baseReducer = baseSlice.reducer;
