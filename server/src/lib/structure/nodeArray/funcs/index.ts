import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import {setArray} from './modify/setArray';
import {sort} from './modify/sort';
import { binarySearch } from './search/binarySearch';
import linearSearch from './search/linearSearch';
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
    name: 'Sort',
    id: 'sort',
    args: [],
    type: FunctionType.RunOnly,
  },
  {
    name: 'Linear Search',
    id: 'linearSearch',
    args: [{label: 'target', type: 'number', value: 0}],
    type: FunctionType.AnimateOnly,
  },
  {
    name: 'Binary Search',
    id: 'binarySearch',
    args: [{label: 'target', type: 'number', value: 0}],
    type: FunctionType.AnimateOnly,
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
  sort: sort,
  linearSearch: linearSearch,
  binarySearch: binarySearch,
  bubbleSort: bubbleSort,
  insertionSort: insertionSort,
  mergeSort: mergeSort,
  quickSort: quickSort,
  selectionSort: selectionSort,
};
