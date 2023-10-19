import {RequestHandler} from 'express';
import {TArg} from '../lib/interface/types';
import {createStructureFromData, isStructure} from '../lib/interface/structure';

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

  return res.send(body);
};

export default postRunFunctionController;
