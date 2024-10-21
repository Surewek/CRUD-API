import { INewUser } from "../types/interfaces";
import { v4 as uuidv4 } from 'uuid';

export const createUser = (newUserData: INewUser) => {
  const { username, age, hobbies } = newUserData;

  return {
    id: uuidv4(),
    username,
    age,
    hobbies,
  }
}
