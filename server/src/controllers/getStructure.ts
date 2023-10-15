import {RequestHandler} from 'express';
import {generateRandomStructure} from '../lib/interface/structure';
import {functionInfo} from '../lib/interface/functions';
import {createFrame} from '../lib/board/frame';

const getStructureController: RequestHandler<{structure: string}> = (
  req,
  res
) => {
  const {structure: structureName} = req.params;

  const [structure, structureData] = generateRandomStructure[structureName]();
  const info = functionInfo[structureName];

  const frame = createFrame();
  structure.serialise(frame);

  res.send({
    functions: info,
    structureFrame: frame,
    structureData: structureData,
  });
};

export default getStructureController;
