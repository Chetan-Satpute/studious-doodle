import {Router} from 'express';
import getStructureController from '../controllers/getStructure';

const router = Router();

router.get('/:structure', getStructureController);

router.get('/', (_req, res) => res.send({message: 'API Route'}));

export default router;
