import { IncomingMessage, ServerResponse } from 'http';
import UserController from '../controllers/users-controller';
import { httpMethods } from '../types/enums';

const router = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url || '';
  const method = req.method || '';

  const baseUrl = '/api/users';
  const idUrlRegExp = /^\/api\/users\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

  if (url === baseUrl && method === httpMethods.get) {

    UserController.getAll(req, res);

  } else if (url.match(idUrlRegExp) && method === httpMethods.get) {

    UserController.getOneById(req, res);

  } else if (url === baseUrl && method === httpMethods.post) {

    UserController.addOne(req, res)

  } else if (url.match(idUrlRegExp) && method === httpMethods.put) {

    UserController.updateOneById(req, res);

  } else if (url.match(idUrlRegExp) && method === httpMethods.delete) {

    UserController.deleteOneById(req, res);

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};

export default router;
