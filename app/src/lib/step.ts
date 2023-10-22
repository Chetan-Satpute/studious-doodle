import {IFrame} from './frame';

export interface IStackFunction {
  code: string;
  done: boolean;
}

export type TCallStack = IStackFunction[];

export interface IStep {
  codeKey: string;
  hlLines: number[];
  frames: IFrame[];
  callStack: TCallStack;
}

export function createStep(): IStep {
  return {
    codeKey: '',
    hlLines: [],
    frames: [],
    callStack: [],
  };
}
