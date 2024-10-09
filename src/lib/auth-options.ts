import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { api } from "./api";
import { UserInfoType } from "@/types/user-info";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await api.post(`/api/auth/login`, {
            username: credentials.username,
            password: credentials.password,
          });

          if (response.status === 200) {
            const decodedToken = jwtDecode(response.data.access) as {
              user_id: number;
              exp: number;
            };

            const userInfo: UserInfoType = await getUserInfo(
              response.data.access,
            );

            return {
              ...response.data,
              id: userInfo.id,
              accessToken: response.data.access,
              refreshToken: response.data.refresh,
              accessTokenExpires: decodedToken.exp,
              role: "owner",
              name: userInfo.username,
            };
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            const message =
              error.response?.data?.message || "Failed to authenticate.";
            throw new Error(message);
          }
          throw new Error("An unexpected error occurred.");
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
        };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        role: token.role,
      };
      console.log(session);
      return session;
    },
  },
};

async function getUserInfo(accessToken: string) {
  try {
    const response = await api.get(`/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
}
