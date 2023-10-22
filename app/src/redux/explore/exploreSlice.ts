import {createSlice} from '@reduxjs/toolkit';
import {IStep, createStep} from '../../lib/step';
import {
  exploreNextStepReducer,
  explorePreviousStepReducer,
  initExploreFunctionReducer,
} from './reducer';

export interface ExploreState {
  codeMap: Record<string, string>;
  steps: IStep[];
  currentStep: number;
}

const initialState: ExploreState = {
  codeMap: {'': ''},
  steps: [createStep()],
  currentStep: 0,
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {
    initExploreFunction: initExploreFunctionReducer,
    exploreNextStep: exploreNextStepReducer,
    explorePreviousStep: explorePreviousStepReducer,
  },
});

export const {initExploreFunction, exploreNextStep, explorePreviousStep} =
  exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;
