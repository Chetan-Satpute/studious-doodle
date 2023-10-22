import {PayloadAction} from '@reduxjs/toolkit';
import {StructureState} from './structureSlice';
import {IFunctionInfo} from '../../lib/func';
import {IFrame} from '../../lib/frame';

export function loadStructureReducer(
  state: StructureState,
  action: PayloadAction<{
    structure: string;
    functionList: IFunctionInfo[];
    structureData: unknown;
    structureFrame: IFrame;
  }>
) {
  state.structure = action.payload.structure;
  state.functionList = action.payload.functionList;
  state.structureData = action.payload.structureData;
  state.structureFrame = action.payload.structureFrame;
}

export function updateFunctionArgReducer(
  state: StructureState,
  action: PayloadAction<{functionId: string; label: string; valueTxt: string}>
) {
  const {functionId, label, valueTxt} = action.payload;

  const funcInfo = state.functionList.find(func => func.id === functionId);
  if (!funcInfo) {
    return;
  }

  const arg = funcInfo.args.find(e => e.label === label);
  if (!arg) {
    return;
  }

  if (arg.type === 'number') {
    arg.value = Number(valueTxt);

    if (isNaN(arg.value)) {
      arg.value = 0;
    }
  }

  if (arg.type === 'number[]') {
    const values = valueTxt
      .split(',')
      .map(e => Number(e))
      .filter(e => isNaN(e) === false);

    arg.value = values.length === 0 ? [0] : values;
  }
}

export function updateStructureReducer(
  state: StructureState,
  action: PayloadAction<{structureData: unknown; structureFrame: IFrame}>
) {
  state.structureData = action.payload.structureData;
  state.structureFrame = action.payload.structureFrame;
}
