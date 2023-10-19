import express from 'express';
import cors from 'cors';

import apiRouter from './routes/apiRouter';
import {logger} from './middleware/logger';

const app = express();

app.use(express.json());
app.use(logger());
app.use(cors());

app.use('/api', apiRouter);

app.get('/', (_req, res) => res.send({message: 'Studious Doodle API'}));
app.get('/ping', (_req, res) => res.send({message: 'pong'}));

export default app;
