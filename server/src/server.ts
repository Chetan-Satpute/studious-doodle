import {Express} from 'express';
import {IncomingMessage, Server, ServerResponse} from 'http';

import {PORT} from './constant/env';

export async function startServer(app: Express) {
  const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} 🚀`);
  });

  return server;
}

export async function stopServer(
  server: Server<typeof IncomingMessage, typeof ServerResponse>
) {
  console.log('Stopping Server ...');
  server.close(() => {
    console.log('Server stopped 🛑');

    // eslint-disable-next-line
    process.exit(0);
  });
}
