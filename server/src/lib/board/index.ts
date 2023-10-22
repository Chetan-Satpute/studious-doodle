import Structure from '../structure';
import {uniqueIdGenerator} from '../utils/number';
import {createFrame} from './frame';
import {IStackFunction, IStep, createStep} from './step';

class Board {
  structures: Record<number, Structure>;
  getId: () => number;

  steps: IStep[];
  currentStep: IStep;

  codeMap: Record<string, string>;

  constructor() {
    this.structures = {};
    this.getId = uniqueIdGenerator();

    this.steps = [];
    this.currentStep = createStep();

    this.codeMap = {};
  }

  getPrimaryStructure() {
    return this.structures[0];
  }

  setPrimaryStructure(struct: Structure) {
    struct.id = 0;
    struct.board = this;

    this.structures[0] = struct;
  }

  add(struct: Structure) {
    struct.id = this.getId();
    struct.board = this;

    this.structures[struct.id] = struct;
  }

  remove(struct: Structure) {
    if (!struct.id || !this.structures[struct.id]) {
      return;
    }

    delete this.structures[struct.id];

    struct.id = null;
    struct.board = null;
  }

  pushFrame() {
    const frame = createFrame();

    for (const id in this.structures) {
      this.structures[id].serialise(frame);
    }

    this.currentStep.frames.push(frame);
  }

  pushStep(codeKey: string, hlLines: number[]) {
    this.currentStep.codeKey = codeKey;
    this.currentStep.hlLines = hlLines;

    const stackClone = this.currentStep.callStack.map(func => {
      const funcClone: IStackFunction = {
        done: func.done,
        code: func.code,
      };

      return funcClone;
    });

    this.pushFrame();
    this.currentStep.callStack.reverse();
    this.steps.push(this.currentStep);

    this.currentStep = createStep();
    this.currentStep.callStack = stackClone;
  }

  setCode(codeKey: string, code: string) {
    this.codeMap[codeKey] = code;
  }

  pushStack(callCode: string) {
    this.currentStep.callStack.push({code: callCode, done: false});
  }

  doneLastCall() {
    const length = this.currentStep.callStack.length;
    this.currentStep.callStack[length - 1].done = true;
  }
}

export default Board;
