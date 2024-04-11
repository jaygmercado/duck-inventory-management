import { User } from './users';

export interface Comment {
  _id: string;
  commenter: string;
  commenterInfo: User;
  content: string;
  created: Date;
}

export interface Post {
  _id: string;
  content: string;
  created: Date;
  author: string;
  authorInfo: User;
  comments: Comment[];
  likes: User[];
}
