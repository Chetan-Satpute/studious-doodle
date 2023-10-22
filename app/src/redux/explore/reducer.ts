import {PayloadAction} from '@reduxjs/toolkit';
import {ExploreState} from './exploreSlice';
import {IStep} from '../../lib/step';

export function initExploreFunctionReducer(
  state: ExploreState,
  action: PayloadAction<{
    steps: IStep[];
    codeMap: Record<string, string>;
  }>
) {
  state.steps = action.payload.steps;
  state.codeMap = action.payload.codeMap;
  state.currentStep = 0;
}

export function updateCurrentStepReducer(
  state: ExploreState,
  action: PayloadAction<number>
) {
  state.currentStep = action.payload;
}

export function exploreNextStepReducer(state: ExploreState) {
  if (state.steps.length > state.currentStep + 1) {
    state.currentStep = state.currentStep + 1;
  }
}

export function explorePreviousStepReducer(state: ExploreState) {
  if (state.steps.length > state.currentStep + 1) {
    state.currentStep = state.currentStep + 1;
  }
}
