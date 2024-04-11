import { Dispatch, SetStateAction } from 'react';

export interface User {
  _id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  image: string;
  coverPhoto: string;
  bio: string;
  roles: string[];
  title: string;
  cys: string;
}

export interface UserContextType {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
}
