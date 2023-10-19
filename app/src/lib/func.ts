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
  animatable: boolean;
  args: TArg[];
}
