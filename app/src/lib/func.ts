type TArgValue = number | number[];
type TArgType = 'number' | 'number[]';

type TArg = {
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

export enum FunctionType {
  RunOnly = 'RUN_ONLY',
  AnimateOnly = 'ANIMATE_ONLY',
  RunAndAnimate = 'RUN_AND_ANIMATE',
}
