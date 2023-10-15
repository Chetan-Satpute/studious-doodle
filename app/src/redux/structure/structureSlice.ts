import {createSlice} from '@reduxjs/toolkit';

import {IFrame, createFrame} from '../../lib/frame';

export interface StructureState {
  structureFrame: IFrame;
}

const initialState: StructureState = {
  structureFrame: createFrame(),
};

const structureSlice = createSlice({
  name: 'structure',
  initialState,
  reducers: {},
});

export const structureReducer = structureSlice.reducer;
