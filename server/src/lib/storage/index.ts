import crypto from 'crypto';
import {IStep} from '../board/step';

const store: Record<string, IStep[]> = {};

class Storage {
  static setSteps(steps: IStep[]) {
    let id = '';

    do {
      id = crypto.randomUUID();
    } while (store[id] !== undefined);

    store[id] = steps;

    setTimeout(
      () => {
        delete store[id];
      },
      1000 * 60 * 60 // One hour
    );

    return id;
  }

  static getSteps(
    id: string,
    startIndex: number,
    endIndex: number
  ): IStep[] | null {
    if (!store[id]) {
      return null;
    }

    endIndex = Math.min(endIndex, store[id].length - 1);

    const steps: IStep[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
      steps.push(store[id][i]);
    }

    return steps;
  }
}

export default Storage;
