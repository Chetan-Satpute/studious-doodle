import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import {setArray} from './modify/setArray';
import {bubbleSort} from './sort/bubbleSort';

export const arrayFuncsInfo: IFunctionInfo[] = [
  {
    name: 'Set Array',
    id: 'setArray',
    args: [{label: 'values', type: 'number[]', value: [1, 2, 3]}],
    type: FunctionType.RunAndAnimate,
  },
  {
    name: 'Bubble Sort',
    id: 'bubbleSort',
    args: [],
    type: FunctionType.AnimateOnly,
  },
];

export const arrayExecutionFunction: Record<string, TExecutionFunction> = {
  setArray: setArray,
  bubbleSort: bubbleSort,
};
