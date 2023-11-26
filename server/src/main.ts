import express from 'express';
import cors from 'cors';

import apiRouter from './routes/apiRouter';
import {logger} from './middleware/logger';

import {PORT} from './constant/env';

const app = express();

app.use(express.json());
app.use(logger());
app.use(cors());

app.use('/api', apiRouter);

app.get('/', (_req, res) => res.send({message: 'Studious Doodle API'}));
app.get('/ping', (_req, res) => res.send({message: 'pong'}));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} 🚀`);
});
