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
              role: userInfo.role,
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
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.role = token.role;
      return session;
    },
  },
};

// async function refreshAccessToken(token: JWT) {
//   try {
//     const response = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
//       {
//         refresh: token.refreshToken,
//       },
//     );

//     if (!response.data.access) {
//       throw new Error("RefreshAccessTokenError");
//     }

//     const decodedToken = jwtDecode(response.data.access) as { exp: number };

//     return {
//       ...token,
//       accessToken: response.data.access,
//       accessTokenExpires: decodedToken.exp,
//       refreshToken: response.data.refresh ?? token.refreshToken,
//     };
//   } catch (error) {
//     console.log("error refresh token", error);
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

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
