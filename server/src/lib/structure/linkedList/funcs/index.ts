import {
  FunctionType,
  IFunctionInfo,
  TExecutionFunction,
} from '../../../interface/types';
import insert from './modify/insert';
import setLinkedList from './modify/setLinkedList';

export const linkedListFuncsInfo: IFunctionInfo[] = [
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
  setLinkedList: setLinkedList,
  insert: insert,
};
