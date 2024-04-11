import { DefaultUser } from 'next-auth';
import 'next-auth/jwt';
import User from '../types/users';
// Extended the default interface properties
// link to documentation: https://next-auth.js.org/getting-started/typescript

declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires: number;
    accessToken?: string;
    error?: string;
    user: DefaultUser;
    refreshToken?: string;
  }
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: string;
    user: { id: string } & User;
  }
}
