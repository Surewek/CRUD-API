import { IncomingMessage } from 'http';
import { IUser } from '../types/interfaces';

const parseRequestBody = (req: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk: string) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error)
      }
    });
  })
}

export default parseRequestBody;
