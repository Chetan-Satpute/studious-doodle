import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import {setArray} from './modify/setArray';
import {bubbleSort} from './sort/bubbleSort';
import insertionSort from './sort/insertionSort';
import mergeSort from './sort/mergeSort';
import quickSort from './sort/quickSort';
import selectionSort from './sort/selectionSort';

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
  {
    name: 'Insertion Sort',
    id: 'insertionSort',
    args: [],
    type: FunctionType.AnimateOnly,
  },
  {
    name: 'Merge Sort',
    id: 'mergeSort',
    args: [],
    type: FunctionType.AnimateOnly,
  },
  {
    name: 'Quick Sort',
    id: 'quickSort',
    args: [],
    type: FunctionType.AnimateOnly,
  },
  {
    name: 'Selection Sort',
    id: 'selectionSort',
    args: [],
    type: FunctionType.AnimateOnly,
  },
];

export const arrayExecutionFunction: Record<string, TExecutionFunction> = {
  setArray: setArray,
  bubbleSort: bubbleSort,
  insertionSort: insertionSort,
  mergeSort: mergeSort,
  quickSort: quickSort,
  selectionSort: selectionSort,
};
