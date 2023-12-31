import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import generateRandom from './modify/generateRandom';
import insert from './modify/insert';
import remove from './modify/remove';
import setLinkedList from './modify/setLinkedList';
import search from './search/search';

export const linkedListFuncsInfo: IFunctionInfo[] = [
  {
    name: 'Generate Random Linked List',
    id: 'generateRandom',
    args: [],
    type: FunctionType.RunOnly,
  },
  {
    name: 'Set Linked List',
    id: 'setLinkedList',
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

export const linkedListExecutionFunction: Record<string, TExecutionFunction> = {
  generateRandom: generateRandom,
  setLinkedList: setLinkedList,
  insert: insert,
  remove: remove,
  search: search,
};
