import {Router} from 'express';
import getStepsController from '../controllers/getSteps';
import getStructureController from '../controllers/getStructure';
import postRunFunctionController from '../controllers/postRunFunction';

const router = Router();

router.get('/step/', getStepsController);

router.get('/', (_req, res) => res.send({message: 'API Route'}));
router.post('/', postRunFunctionController);

router.get('/:structure', getStructureController);

export default router;
