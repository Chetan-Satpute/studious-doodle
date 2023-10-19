import Structure from '../structure';
import {uniqueIdGenerator} from '../utils/number';
import {createFrame} from './frame';
import {IStep, createStep} from './step';

class Board {
  structures: Record<number, Structure>;
  getId: () => number;

  currentStep: IStep;

  constructor() {
    this.structures = {};
    this.getId = uniqueIdGenerator();
    this.currentStep = createStep();
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
}

export default Board;
