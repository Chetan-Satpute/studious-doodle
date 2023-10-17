import {PayloadAction} from '@reduxjs/toolkit';
import {StructureState} from './structureSlice';
import {GetStructureResponseBody} from '../thunks/chooseStructure';

export function loadStructureReducer(
  state: StructureState,
  action: PayloadAction<GetStructureResponseBody>
) {
  state.functionList = action.payload.functions;
  state.structureData = action.payload.structureData;
  state.structureFrame = action.payload.structureFrame;
}
