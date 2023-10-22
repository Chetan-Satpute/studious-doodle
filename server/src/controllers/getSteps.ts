import {RequestHandler} from 'express';
import Storage from '../lib/storage';

const getStepsController: RequestHandler = async (req, res) => {
  const id = req.query.id as string;
  const start = Number(req.query.start);
  const end = Number(req.query.end);

  if (!id || isNaN(start) || isNaN(end)) {
    res.statusCode = 400;
    return res.send({message: 'Bad Request'});
  }

  const steps = Storage.getSteps(id, start, end);

  if (steps === null) {
    res.statusCode = 404;
    return res.send({message: 'Session Expired!'});
  }

  return res.send({steps: steps});
};

export default getStepsController;
