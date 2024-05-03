import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client Id and password are required.");
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          verified: profile.emailVerified,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && user) {
        token.userId = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.userId } };
    },
  },
};

//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. 'Sign in with...')
//     name: "Credentials",
//     // The credentials is used to generate a suitable form on the sign in page.
//     // You can specify whatever fields you are expecting to be submitted.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       email: {},
//       password: {},
//     },
//     async authorize(credentials, req) {
//       console.log({ credentials });

//       // ** validation needed. **

//       const response =
//         await sql`SELECT * FROM users WHERE email=${credentials?.email}`;
//       const user = response.rows[0];

//       const passwordCorrect = await compare(
//         credentials?.password || "",
//         user.password
//       );

//       if (passwordCorrect) {
//         return {
//           id: user.id,
//           email: user.email,
//         };
//       }
//       return null;
//     },
//   }),
// ],
