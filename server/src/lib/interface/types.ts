import Board from '../board';

export type TArgValue = number | number[];
export type TArgType = 'number' | 'number[]';

export type TArg = {
  label: string;
  type: TArgType;
  value: TArgValue;
};

export interface IFunctionInfo {
  name: string;
  id: string;
  args: TArg[];
  type: FunctionType;
}

export type TExecutionFunction = (
  board: Board,
  args: Record<string, TArgValue>,
  animate: boolean
) => Promise<void>;

export enum FunctionType {
  RunOnly = 'RUN_ONLY',
  AnimateOnly = 'ANIMATE_ONLY',
  RunAndAnimate = 'RUN_AND_ANIMATE',
}
