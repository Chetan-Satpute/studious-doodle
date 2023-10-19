import {RequestHandler} from 'express';
import {generateRandomStructure, isStructure} from '../lib/interface/structure';
import {functionInfo} from '../lib/interface/functions';
import {createFrame} from '../lib/board/frame';

const getStructureController: RequestHandler<{structure: string}> = async (
  req,
  res
) => {
  const {structure: structureName} = req.params;

  if (!isStructure(structureName)) {
    res.statusCode = 404;
    return res.send({message: 'Structure Not Found!'});
  }

  const [structure, structureData] = generateRandomStructure[structureName]();
  const info = functionInfo[structureName];

  structure.moveTo(100, 100);

  const frame = createFrame();
  structure.serialise(frame);

  return res.send({
    functions: info,
    structureFrame: frame,
    structureData: structureData,
  });
};

export default getStructureController;
