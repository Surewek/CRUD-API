import { IncomingMessage, ServerResponse } from "http";

type IHobbies = string[];

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: IHobbies;
}

export interface INewUser extends Omit<IUser, 'id'> {};

export interface IEndpointHandler {
  (req: IncomingMessage, res: ServerResponse): unknown;
}

export interface IEndpoints {
  [path: string]: IEndpoint;
}

export interface IEndpoint {
  [method: string]: IEndpointHandler;
}

export type IUsers = Map<string, IUser>;
