import {createSlice} from '@reduxjs/toolkit';
import {IStep, createStep} from '../../lib/step';
import {
  exploreNextStepReducer,
  explorePreviousStepReducer,
  initExploreFunctionReducer,
  setStepsReducer,
} from './reducer';

export interface ExploreState {
  id: string;
  codeMap: Record<string, string>;
  steps: (IStep | null)[];
  currentStep: number;
}

const initialState: ExploreState = {
  id: '',
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
    setSteps: setStepsReducer,
  },
});

export const {
  initExploreFunction,
  exploreNextStep,
  explorePreviousStep,
  setSteps,
} = exploreSlice.actions;

export const exploreReducer = exploreSlice.reducer;
