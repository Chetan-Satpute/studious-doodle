import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import setBinarySearchTree from './modify/setBinarySearchTree';

export const binarySearchTreeFuncsInfo: IFunctionInfo[] = [
  {
    name: 'Set BST (Insert values in empty tree)',
    id: 'setBinarySearchTree',
    args: [{label: 'values', type: 'number[]', value: [1, 2, 3]}],
    type: FunctionType.RunOnly,
  },
  {
    name: 'Insert',
    id: 'insert',
    args: [
      {label: 'position', type: 'number', value: 0},
      {label: 'value', type: 'number', value: 0},
    ],
    type: FunctionType.RunAndAnimate,
  },
  {
    name: 'Remove',
    id: 'remove',
    args: [{label: 'position', type: 'number', value: 0}],
    type: FunctionType.RunAndAnimate,
  },
  {
    name: 'Search',
    id: 'search',
    args: [{label: 'target', type: 'number', value: 0}],
    type: FunctionType.AnimateOnly,
  },
];

export const binarySearchTreeExecutionFunction: Record<
  string,
  TExecutionFunction
> = {
  setBinarySearchTree: setBinarySearchTree,
};