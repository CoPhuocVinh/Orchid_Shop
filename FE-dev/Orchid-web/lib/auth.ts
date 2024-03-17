import NextAuth, { NextAuthConfig } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

interface CustomJWT extends JWT {
  id: string;
  name: string;
  email: string;
  img: string;
  role: string;
  dob: string;
  gender:string;
  access_token: string;
  refresh_token: string;
  tokenType: string;
  emailVerified: Date | null;
}
export const authOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("https://orchid.fams.io.vn/api/v1/auth/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
              }),
          });
  
          if (!res.ok) {
             return null
          }
  
          const data = await res.json();
         
          const userRes = data.payload;
          const metadata = data.metadata;
  
          const user = { ...userRes, ...metadata };
  
          return user;
      } catch (error) {
          return null;
      }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user , trigger, session }) {

      if(trigger === "update"){
        return {...token, ...session.user}
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as CustomJWT;

      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.img = token.img as string;
        session.user.dob = token.dob as string;
        session.user.gender = token.gender as string;
        session.user.access_token = token.access_token as string;
        session.user.refresh_token = token.refresh_token as string;
        session.user.tokenType = token.tokenType as string;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut, unstable_update: update } = NextAuth(authOptions);
