import {PayloadAction} from '@reduxjs/toolkit';
import {ExploreState} from './exploreSlice';
import {IStep} from '../../lib/step';

export function initExploreFunctionReducer(
  state: ExploreState,
  action: PayloadAction<{
    id: string;
    steps: IStep[];
    codeMap: Record<string, string>;
    totalSteps: number;
  }>
) {
  state.id = action.payload.id;
  state.steps = action.payload.steps;
  state.codeMap = action.payload.codeMap;
  state.currentStep = 0;

  for (
    let i = action.payload.steps.length;
    i < action.payload.totalSteps;
    i++
  ) {
    state.steps.push(null);
  }
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
  if (state.currentStep !== 0) {
    state.currentStep -= 1;
  }
}

export function setStepsReducer(
  state: ExploreState,
  action: PayloadAction<{steps: IStep[]; startIndex: number}>
) {
  const {steps, startIndex} = action.payload;

  for (let i = 0; i < steps.length; i++) {
    state.steps[startIndex + i] = steps[i];
  }
}

export function resetExploreReducer(state: ExploreState) {
  state.id = '';
}
