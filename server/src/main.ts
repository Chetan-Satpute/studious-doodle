import app from './app';
import {startServer, stopServer} from './server';

startServer(app).then(server => {
  process.on('SIGINT', () => stopServer(server));
  process.on('SIGTERM', () => stopServer(server));
});
