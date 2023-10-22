import {RequestHandler} from 'express';
import {TArg, TArgValue} from '../lib/interface/types';
import {createStructureFromData, isStructure} from '../lib/interface/structure';
import {executeFunction} from '../lib/interface/functions';
import Board from '../lib/board';
import {createFrame} from '../lib/board/frame';
import {IStep} from '../lib/board/step';
import Storage from '../lib/storage';

interface IPostRunFunctionRequestBody {
  structure: 'string';
  structureData: unknown;
  functionId: string;
  args: TArg[];
  animated: boolean;
}

const postRunFunctionController: RequestHandler = async (req, res) => {
  const body = req.body as IPostRunFunctionRequestBody;
  const {
    structure: structureName,
    structureData,
    functionId,
    args,
    animated,
  } = body;

  if (!isStructure(structureName)) {
    res.statusCode = 404;
    return res.send({message: 'Structure Not Found!'});
  }

  const structure = createStructureFromData[structureName](structureData);

  const board = new Board();
  board.setPrimaryStructure(structure);

  const processedArgs: Record<string, TArgValue> = {};
  args.reduce((acc, obj) => {
    acc[obj.label] = obj.value;
    return acc;
  }, processedArgs);

  await executeFunction[structureName][functionId](
    board,
    processedArgs,
    animated
  );

  const structData = board.getPrimaryStructure().toData();
  const structFrame = createFrame();
  board.getPrimaryStructure().serialise(structFrame);

  const runID = Storage.setSteps(board.steps);

  const steps: IStep[] = [];

  for (let i = 0; i < 10; i++) {
    if (i === board.steps.length) {
      break;
    }

    steps.push(board.steps[i]);
  }

  return res.send({
    id: runID,
    structureFrame: structFrame,
    structureData: structData,
    steps: steps,
    codeMap: board.codeMap,
    totalSteps: board.steps.length,
  });
};

export default postRunFunctionController;
