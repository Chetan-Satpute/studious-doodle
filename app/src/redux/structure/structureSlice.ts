import {createSlice} from '@reduxjs/toolkit';

import {IFrame, createFrame} from '../../lib/frame';
import {IFunctionInfo} from '../../lib/func';
import {
  loadStructureReducer,
  updateFunctionArgReducer,
  updateStructureReducer,
} from './reducer';

export interface StructureState {
  structure: string;
  structureData: unknown;
  structureFrame: IFrame;
  functionList: IFunctionInfo[];
}

const initialState: StructureState = {
  structure: 'array',
  structureData: {},
  structureFrame: createFrame(),
  functionList: [],
};

const structureSlice = createSlice({
  name: 'structure',
  initialState,
  reducers: {
    loadStructure: loadStructureReducer,
    updateFunctionArg: updateFunctionArgReducer,
    updateStructure: updateStructureReducer,
  },
});

export const {loadStructure, updateFunctionArg, updateStructure} =
  structureSlice.actions;

export const structureReducer = structureSlice.reducer;
