import {Request} from 'express';
import morgan from 'morgan';
import path from 'path';
import {createStream} from 'rotating-file-stream';

import {NODE_ENV, SAVE_LOGS} from '../constant/env';

const productionFormatString = `\
:remote-addr - :remote-user [:date[clf]] \
":method :url HTTP/:http-version" :status :res[content-length] \
":referrer" ":user-agent" \
:req-query :req-params :req-body
`;

export function logger() {
  if (NODE_ENV === 'production') {
    morgan.token(
      'req-query',
      (req: Request) => `\nQuery ${JSON.stringify(req.query)}`
    );
    morgan.token(
      'req-params',
      (req: Request) => `\nParams ${JSON.stringify(req.params)}`
    );
    morgan.token(
      'req-body',
      (req: Request) => `\nBody ${JSON.stringify(req.body)}`
    );

    if (SAVE_LOGS) {
      const fileLogStream = createStream('file.log', {
        size: '100M',
        interval: '1d',
        path: path.join(__dirname, 'log'),
      });

      return morgan(productionFormatString, {stream: fileLogStream});
    } else {
      return morgan(productionFormatString);
    }
  } else {
    return morgan('dev');
  }
}
