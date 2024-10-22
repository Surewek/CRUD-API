import { IUser, IUsers } from '../types/interfaces';
import { createUser } from '../models/user-model';
import defaultUsers from '../data/startup-db';
import { IncomingMessage, ServerResponse } from 'http';
import parseRequestBody from '../utils/request-parser';

let users: IUsers = new Map(JSON.parse(defaultUsers));

class UserController {
  getAll(req: IncomingMessage, res: ServerResponse) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const usersData = Array.from(users.values());

    const parsedUsersData = JSON.stringify(usersData);

    res.end(parsedUsersData);
  }

  getOneById(req: IncomingMessage, res: ServerResponse) {
    const url = req.url as string;

    const userId = url.split('/')[3];

    const isUserExists = users.has(userId);

    if (isUserExists) {
      const user = users.get(userId);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  async addOne(req: IncomingMessage, res: ServerResponse) {
    const body = await parseRequestBody(req);

    if (body && body.username && body.age && body.hobbies) {
      const { username, age, hobbies }: IUser = body;
      const newUser = createUser({ username, age, hobbies });
      users.set(newUser.id, newUser);

      const addedUser = users.get(newUser.id);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(addedUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Invalid input' }));
    }
  }


  async updateOneById(req: IncomingMessage, res: ServerResponse) {
    const url = req.url as string;

    const userId = url.split('/')[3];

    const isUserExists = users.has(userId);

    const body = await parseRequestBody(req);
    const { id, username, age, hobbies }: IUser = body;

    if (isUserExists
      && body
      && body.id
      && body.id !== userId
      && body.username
      && body.age
      && body.hobbies) {
      const updatedUser = users.set(userId, { ...body })
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  async deleteOneById(req: IncomingMessage, res: ServerResponse) {
    const url = req.url as string;

    const userId = url.split('/')[3];

    const isUserExists = users.has(userId);

    if (isUserExists) {
      users.delete(userId);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }
}

export default new UserController;