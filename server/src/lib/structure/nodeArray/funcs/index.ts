import {IFunctionInfo, TExecutionFunction} from '../../../interface/types';
import {setArray} from './modify/setArray';

export const arrayFuncsInfo: IFunctionInfo[] = [
  {
    name: 'Set Array',
    id: 'setArray',
    animatable: true,
    args: [{label: 'values', type: 'number[]', value: [1, 2, 3]}],
  },
];

export const arrayExecutionFunction: Record<string, TExecutionFunction> = {
  setArray: setArray,
};
