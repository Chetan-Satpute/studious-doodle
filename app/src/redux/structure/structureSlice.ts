import {createSlice} from '@reduxjs/toolkit';

import {IFrame, createFrame} from '../../lib/frame';
import {IFunctionInfo} from '../../lib/func';
import {loadStructureReducer} from './reducer';

export interface StructureState {
  structureData: unknown;
  structureFrame: IFrame;
  functionList: IFunctionInfo[];
}

const initialState: StructureState = {
  structureData: {},
  structureFrame: createFrame(),
  functionList: [],
};

const structureSlice = createSlice({
  name: 'structure',
  initialState,
  reducers: {
    loadStructure: loadStructureReducer,
  },
});

export const {loadStructure} = structureSlice.actions;

export const structureReducer = structureSlice.reducer;
