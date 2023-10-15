export type TArgValue = number | number[];
export type TArgType = 'number' | 'number[]';

export type TArg = {
  type: TArgType;
  value: TArgValue;
};

export interface IFunctionInfo {
  name: string;
  id: string;
  args: TArg[];
}
