import {PayloadAction} from '@reduxjs/toolkit';

import {BaseState} from './baseSlice';

import {SideBarView} from '../../components/SideBar/types';

export function setErrorMessageReducer(
  state: BaseState,
  action: PayloadAction<string>
) {
  state.errorMessage = action.payload;
}

export function changeSideBarViewReducer(
  state: BaseState,
  action: PayloadAction<SideBarView>
) {
  state.sidebarView = action.payload;

  switch (action.payload) {
    case SideBarView.ChooseStructure:
      state.showCanvasOverlay = true;
      break;
    case SideBarView.Structure:
      state.showCanvasOverlay = false;
      break;
    case SideBarView.Loading:
    default:
      state.errorMessage = '';
      break;
  }
}
