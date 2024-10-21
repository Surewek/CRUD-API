type IHobbies = string[];

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: IHobbies;
}

export interface INewUser extends Omit<IUser, 'id'> {};
