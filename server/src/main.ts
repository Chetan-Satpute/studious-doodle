import express from 'express';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import path from 'path';

import apiRouter from './routes/apiRouter';
import {logger} from './middleware/logger';

import {NODE_ENV, PORT} from './constant/env';

const app = express();

app.use(express.json());
app.use(logger());
app.use(cors());

app.use('/api', apiRouter);

app.get('/', (_req, res) => res.send({message: 'Studious Doodle API'}));
app.get('/ping', (_req, res) => res.send({message: 'pong'}));

if (NODE_ENV === 'production') {
  const keyPath = path.join(__dirname, '..', 'certs', 'private-key.pem');
  const certPath = path.join(__dirname, '..', 'certs', 'certificate.pem');

  const privateKey = fs.readFileSync(keyPath);
  const certificate = fs.readFileSync(certPath);

  const credentials = {key: privateKey, cert: certificate};
  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
  });
}
