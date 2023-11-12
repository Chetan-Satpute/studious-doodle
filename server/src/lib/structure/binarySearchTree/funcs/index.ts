import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import generateRandom from './modify/generateRandom';
import insert from './modify/insert';
import remove from './modify/remove';
import setBinarySearchTree from './modify/setBinarySearchTree';
import search from './search/search';

export const binarySearchTreeFuncsInfo: IFunctionInfo[] = [
  {
    name: 'Generate Random Tree',
    id: 'generateRandom',
    args: [],
    type: FunctionType.RunOnly,
  },
  {
    name: 'Set BST (Insert values in empty tree)',
    id: 'setBinarySearchTree',
    args: [{label: 'values', type: 'number[]', value: [1, 2, 3]}],
    type: FunctionType.RunOnly,
  },
  {
    name: 'Insert',
    id: 'insert',
    args: [{label: 'value', type: 'number', value: 0}],
    type: FunctionType.RunAndAnimate,
  },
  {
    name: 'Remove',
    id: 'remove',
    args: [{label: 'value', type: 'number', value: 0}],
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
  generateRandom: generateRandom,
  setBinarySearchTree: setBinarySearchTree,
  search: search,
  insert: insert,
  remove: remove,
};
