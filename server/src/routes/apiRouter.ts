import {Router} from 'express';
import getStructureController from '../controllers/getStructure';
import postRunFunctionController from '../controllers/postRunFunction';

const router = Router();

router.get('/:structure', getStructureController);

router.get('/', (_req, res) => res.send({message: 'API Route'}));
router.post('/', postRunFunctionController);

export default router;
