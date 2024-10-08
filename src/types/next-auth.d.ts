import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: string;
    error?: string;
    role: string;
  }
}
