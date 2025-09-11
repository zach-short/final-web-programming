import { DefaultSession } from 'next-auth';

export type UserRole = 'admin' | 'member' | 'user';

declare module 'next-auth' {
  interface Session {
    apiToken?: string;
    user: {
      id: string;
      role?: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    apiToken?: string;
    role?: UserRole;
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    apiToken?: string;
    userId?: string;
    role?: UserRole;
  }
}