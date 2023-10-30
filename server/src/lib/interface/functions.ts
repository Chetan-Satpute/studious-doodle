import {
  binarySearchTreeExecutionFunction,
  binarySearchTreeFuncsInfo,
} from '../structure/binarySearchTree/funcs';
import {
  linkedListExecutionFunction,
  linkedListFuncsInfo,
} from '../structure/linkedList/funcs';
import {
  arrayExecutionFunction,
  arrayFuncsInfo,
} from '../structure/nodeArray/funcs';
import {IFunctionInfo, TExecutionFunction} from './types';

export const functionInfo: Record<string, IFunctionInfo[]> = {
  array: arrayFuncsInfo,
  linkedList: linkedListFuncsInfo,
  binarySearchTree: binarySearchTreeFuncsInfo,
};

export const executeFunction: Record<
  string,
  Record<string, TExecutionFunction>
> = {
  array: arrayExecutionFunction,
  linkedList: linkedListExecutionFunction,
  binarySearchTree: binarySearchTreeExecutionFunction,
};
