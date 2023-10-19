import {
  arrayExecutionFunction,
  arrayFuncsInfo,
} from '../structure/nodeArray/funcs';
import {IFunctionInfo, TExecutionFunction} from './types';

export const functionInfo: Record<string, IFunctionInfo[]> = {
  array: arrayFuncsInfo,
};

export const executeFunction: Record<
  string,
  Record<string, TExecutionFunction>
> = {
  array: arrayExecutionFunction,
};
