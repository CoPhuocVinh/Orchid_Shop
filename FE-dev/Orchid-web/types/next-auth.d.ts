import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image_url: string;
      role: string;
      dob: string;
      gender:string;
      access_token: string;
      refresh_token: string;
      tokenType: string;
      emailVerified : Date | null

    };
  }
}
