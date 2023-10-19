import {IFrame} from './frame';

export interface IStep {
  codeKey: string;
  hlLines: number[];
  frames: IFrame[];
}

export function createStep(): IStep {
  return {
    codeKey: '',
    hlLines: [],
    frames: [],
  };
}
